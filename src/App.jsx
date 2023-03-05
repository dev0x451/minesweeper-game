import './App.css'
import Cell from './Cell'
import { useState, useEffect } from 'react'

const TABLE_SIZE = 16
const MINES_TOTAL = 40

function App() {
  const [cells, setCells] = useState([])
  const [timer, setTimer] = useState(0)
  const [appState, setAppState] = useState('')
  const [minesCount, setMinesCount] = useState(MINES_TOTAL)

  useEffect(() => {
    createDefaultTable()
  }, [])

  function createDefaultTable() {
    const t = []
    let mines = 0
    //создаем дефолтное поле
    for (let i = 0; i < TABLE_SIZE; i++) {
      let row = []
      for (let j = 0; j < TABLE_SIZE; j++) {
        row.push({ state: '❎', type: '⏹️', minesaround: 0 })
      }
      t.push(row)
    }
    setCells([...[...t]])
  }

  function handleCalc() {
    createDefaultTable()
    setMinesCount(0)
    let mines = 0
    //создаем мины рандомно
    for (let i = 0; i < TABLE_SIZE; i++) {
      for (let j = 0; j < TABLE_SIZE; j++) {
        if (Math.random() > 0.85 && mines < MINES_TOTAL) {
          setCell(i, j, { state: cells[i][j].state, type: '💣', minesaround: cells[i][j].minesaround })
          mines++
        }
      }
    }
    setMinesCount(mines)
    checkAllMinesAround()
  }

  function checkAllMinesAround() {
    //проверяем мины вокруг
    for (let i = 0; i < TABLE_SIZE; i++) {
      for (let j = 0; j < TABLE_SIZE; j++) {
        checkNeighbours(i, j)
      }
    }
  }

  function showFullMap() {
    for (let i = 0; i < TABLE_SIZE; i++) {
      for (let j = 0; j < TABLE_SIZE; j++) {
        setCell(i, j, { state: 'GAMEOVER', type: cells[i][j].type, minesaround: cells[i][j].minesaround })
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function setCell(i, j, cell) {
    const tmp = [...[...cells]]
    tmp[i][j].state = cell.state
    tmp[i][j].type = cell.type
    setCells([...[...tmp]])
  }

  function checkNeighbours(i, j) {
    let minesCount = 0
    if (i + 1 in cells && cells[i + 1][j].type === '💣') minesCount++
    if (j + 1 in cells[i] && cells[i][j + 1].type === '💣') minesCount++
    if (i + 1 in cells && j + 1 in cells[i + 1] && cells[i + 1][j + 1].type === '💣') minesCount++
    if (i + 1 in cells && j - 1 in cells[i + 1] && cells[i + 1][j - 1].type === '💣') minesCount++
    if (i - 1 in cells && j + 1 in cells[i - 1] && cells[i - 1][j + 1].type === '💣') minesCount++
    if (i - 1 in cells && cells[i - 1][j].type === '💣') minesCount++
    if (j - 1 in cells[i] && cells[i][j - 1].type === '💣') minesCount++
    if (i - 1 in cells && j - 1 in cells[i - 1] && cells[i - 1][j - 1].type === '💣') minesCount++
    const tmp = [...[...cells]]
    tmp[i][j].minesaround = minesCount
    setCells([...[...tmp]])
  }

  function handleClick(i, j, clickType) {
    console.log(cells[i][j].state)
    if (clickType === 'rightClick') {
      if (cells[i][j].state === '❎')
        setCell(i, j, { state: '🚩', type: cells[i][j].type, minesaround: cells[i][j].minesaround })
      else if (cells[i][j].state === '🚩')
        setCell(i, j, { state: '❓', type: cells[i][j].type, minesaround: cells[i][j].minesaround })
      else if (cells[i][j].state === '❓')
        setCell(i, j, { state: '❎', type: cells[i][j].type, minesaround: cells[i][j].minesaround })
    } else if (clickType === 'leftClick') {
      if (cells[i][j].type === '💣') {
        setCell(i, j, { state: '✅', type: '💥', minesaround: cells[i][j].minesaround })
        showFullMap()
      } else setCell(i, j, { state: '✅', type: cells[i][j].type, minesaround: cells[i][j].minesaround })
    }

    // {
    //   if (cells[i][j][0] == 'MINE') setCell(i, j, ['FREE', cells[i][j][1]])
    //   else if (cells[i][j][0] == 'FREE') setCell(i, j, ['MINE', cells[i][j][1]])
    // }
  }

  return (
    <div className="App">
      <div>{timer} секунд</div>
      <div>{minesCount} мин осталось</div>
      <button onClick={handleCalc}>начать игру</button>
      <div className="cellstable">
        {cells.map((row, i) => {
          return row.map((cell, j) => {
            return <Cell key={j} i={i} j={j} cell={cell} handleClick={handleClick} />
          })
        })}
      </div>
    </div>
  )
}
export default App
