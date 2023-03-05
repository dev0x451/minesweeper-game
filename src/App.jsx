import './App.css'
import Cell from './Cell'
import { useState, useEffect } from 'react'

const TABLE_SIZE = 16
const MINES_TOTAL = 40

function App() {
  const [cells, setCells] = useState([])
  const [timer, setTimer] = useState(0)
  const [minesCount, setMinesCount] = useState(MINES_TOTAL)

  useEffect(() => {
    const t = []
    let mines = 0
    //создаем рандомное поле
    for (let i = 0; i < TABLE_SIZE; i++) {
      let row = []
      for (let j = 0; j < TABLE_SIZE; j++) {
        if (Math.round(Math.random()) && mines < MINES_TOTAL) {
          // row.push(['MINE', 'NONE', 0])
          row.push({ state: 'covered', type: 'MINE', minesaround: 0 })
          mines++
        } else {
          // row.push(['FREE', 'NONE', 0])
          row.push({ state: 'covered', type: 'FREE', minesaround: 0 })
        }
      }
      t.push(row)
    }

    console.log([...[...t]])
    setCells([...[...t]])
    // setCells([...[...[...t]]])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function setCell(i, j, cell) {
    // const tmp = [...[...[...cells]]]
    const tmp = [...[...cells]]
    // tmp[i][j][0] = cell[0]
    // tmp[i][j][1] = cell[1]
    tmp[i][j].state = cell.state
    tmp[i][j].type = cell.type
    setCells([...[...tmp]])
  }

  function checkNeighbours(i, j) {
    let minesCount = 0
    // if (i + 1 in cells && i + 1 in cells && cells[i + 1][j][0] === 'MINE') minesCount++
    // if (j + 1 in cells[i] && cells[i][j + 1][0] === 'MINE') minesCount++
    // if (i + 1 in cells && j + 1 in cells[i + 1] && cells[i + 1][j + 1][0] === 'MINE') minesCount++
    // if (i + 1 in cells && j - 1 in cells[i + 1] && cells[i + 1][j - 1][0] === 'MINE') minesCount++
    // if (i - 1 in cells && j + 1 in cells[i - 1] && cells[i - 1][j + 1][0] === 'MINE') minesCount++
    // if (i - 1 in cells && cells[i - 1][j][0] === 'MINE') minesCount++
    // if (j - 1 in cells[i] && cells[i][j - 1][0] === 'MINE') minesCount++
    // if (i - 1 in cells && j - 1 in cells[i - 1] && cells[i - 1][j - 1][0] === 'MINE') minesCount++

    if (i + 1 in cells && cells[i + 1][j].type === 'MINE') minesCount++
    if (j + 1 in cells[i] && cells[i][j + 1].type === 'MINE') minesCount++
    if (i + 1 in cells && j + 1 in cells[i + 1] && cells[i + 1][j + 1].type === 'MINE') minesCount++
    if (i + 1 in cells && j - 1 in cells[i + 1] && cells[i + 1][j - 1].type === 'MINE') minesCount++
    if (i - 1 in cells && j + 1 in cells[i - 1] && cells[i - 1][j + 1].type === 'MINE') minesCount++
    if (i - 1 in cells && cells[i - 1][j].type === 'MINE') minesCount++
    if (j - 1 in cells[i] && cells[i][j - 1].type === 'MINE') minesCount++
    if (i - 1 in cells && j - 1 in cells[i - 1] && cells[i - 1][j - 1].type === 'MINE') minesCount++

    // const tmp = [...[...[...cells]]]
    const tmp = [...[...cells]]
    // tmp[i][j][2] = minesCount
    tmp[i][j].minesaround = minesCount
    // setCells([...[...[...tmp]]])
    setCells([...[...tmp]])
  }

  function handleClick(i, j, clickType) {
    checkNeighbours(i, j)

    // if (clickType === 'rightClick') {
    //   if (cells[i][j][1] == 'NONE') setCell(i, j, [cells[i][j][0], 'FLAG'])
    //   else if (cells[i][j][1] == 'FLAG') setCell(i, j, [cells[i][j][0], 'QUEST'])
    //   else if (cells[i][j][1] == 'QUEST') setCell(i, j, [cells[i][j][0], 'NONE'])
    // } else if (clickType === 'leftClick') {
    //   if (cells[i][j][0] == 'MINE') setCell(i, j, ['FREE', cells[i][j][1]])
    //   else if (cells[i][j][0] == 'FREE') setCell(i, j, ['MINE', cells[i][j][1]])
    // }
  }

  return (
    <div className="App">
      <div>{timer} секунд</div>
      <div>{minesCount} мин осталось</div>
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
