import './App.css'
import Cell from './Cell'
import { useState, useEffect } from 'react'

const TABLE_SIZE = 16
const MINES_TOTAL = 40
export const UNCOVERED = 'UNCOVERED'
export const COVERED = 'COVERED'
export const FREE = 'FREE'
export const BOMB = 'BOMB'
export const EXPLOSION = 'EXPLOSION'
export const FLAG = 'FLAG'
export const QUESTION = 'QUESTION'

function App() {
  const [cells, setCells] = useState([])
  const [timer, setTimer] = useState(0)
  const [appState, setAppState] = useState('IDLE')
  const [appSMILE, setAppSMILE] = useState('app__smile_happy')
  const [minesCount, setMinesCount] = useState(MINES_TOTAL)

  useEffect(() => {
    let interval = null
    if (appState === 'NEWGAME') {
      interval = setInterval(() => {
        setTimer((t) => t + 1)
      }, 1000)
    }

    // if (appState !== 'YOUWIN' || appState !== 'GAMEOVER') setAppSMILE(smile)

    return () => {
      clearInterval(interval)
    }
  }, [appState])

  useEffect(() => {
    createDefaultTable()
  }, [])

  useEffect(() => {
    if (minesCount === 0 && appState !== 'IDLE') {
      let count = 0

      for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
          if (cells[i][j].state === FLAG && cells[i][j].type === BOMB) {
            count++
          }
        }
      }
      if (count === MINES_TOTAL) {
        uncoverAllCells()
        setAppState('YOUWIN')
        setAppSMILE('app__smile_cool')
      }
    }
  }, [minesCount])

  // useEffect(() => {
  //   console.log(appState)
  // }, [appState])

  function createDefaultTable() {
    const tmp = []
    //создаем дефолтное поле
    for (let i = 0; i < TABLE_SIZE; i++) {
      let row = []
      for (let j = 0; j < TABLE_SIZE; j++) {
        row.push({ state: COVERED, type: FREE, minesaround: 0 })
      }
      tmp.push(row)
    }
    setCells([...[...tmp]])
  }

  function setRandomMines(k, m) {
    let mines = 0
    //создаем мины рандомно
    for (let i = 0; i < TABLE_SIZE; i++) {
      for (let j = 0; j < TABLE_SIZE; j++) {
        if ((k !== i || m !== j) && Math.random() > 0.88 && mines < MINES_TOTAL) {
          setCell(i, j, { state: cells[i][j].state, type: BOMB, minesaround: cells[i][j].minesaround })
          mines++
        } else setCell(i, j, { state: cells[i][j].state, type: FREE, minesaround: cells[i][j].minesaround })
      }
    }
    return mines
  }

  function handleSmileClick() {
    setAppState('IDLE')
    setMinesCount(MINES_TOTAL)
    setTimer(0)
    createDefaultTable()
  }

  function checkAllMinesAround() {
    //проверяем мины вокруг
    for (let i = 0; i < TABLE_SIZE; i++) {
      for (let j = 0; j < TABLE_SIZE; j++) {
        checkNeighbours(i, j)
      }
    }
  }

  function uncoverAllCells() {
    //открыть все поля
    for (let i = 0; i < TABLE_SIZE; i++) {
      for (let j = 0; j < TABLE_SIZE; j++) {
        setCell(i, j, { state: UNCOVERED, type: cells[i][j].type, minesaround: cells[i][j].minesaround })
      }
    }
  }

  function setCell(i, j, cell) {
    const tmp = [...[...cells]]
    tmp[i][j].state = cell.state
    tmp[i][j].type = cell.type
    setCells([...[...tmp]])
  }

  function checkNeighbours(i, j) {
    // если вышли за границы, return
    // if (i - 1 < 0 || j - 1 < 0 || i + 1 >= TABLE_SIZE || j + 1 >= TABLE_SIZE) return

    let minesCount = 0

    // if (cells[i + 1][j].type === BOMB) minesCount++
    // if (cells[i][j + 1].type === BOMB) minesCount++
    // if (cells[i + 1][j + 1].type === BOMB) minesCount++
    // if (cells[i + 1][j - 1].type === BOMB) minesCount++
    // if (cells[i - 1][j + 1].type === BOMB) minesCount++
    // if (cells[i - 1][j].type === BOMB) minesCount++
    // if (cells[i][j - 1].type === BOMB) minesCount++
    // if (cells[i - 1][j - 1].type === BOMB) minesCount++

    if (i + 1 in cells && cells[i + 1][j].type === BOMB) minesCount++
    if (j + 1 in cells[i] && cells[i][j + 1].type === BOMB) minesCount++
    if (i + 1 in cells && j + 1 in cells[i + 1] && cells[i + 1][j + 1].type === BOMB) minesCount++
    if (i + 1 in cells && j - 1 in cells[i + 1] && cells[i + 1][j - 1].type === BOMB) minesCount++
    if (i - 1 in cells && j + 1 in cells[i - 1] && cells[i - 1][j + 1].type === BOMB) minesCount++
    if (i - 1 in cells && cells[i - 1][j].type === BOMB) minesCount++
    if (j - 1 in cells[i] && cells[i][j - 1].type === BOMB) minesCount++
    if (i - 1 in cells && j - 1 in cells[i - 1] && cells[i - 1][j - 1].type === BOMB) minesCount++

    const tmp = [...[...cells]]
    tmp[i][j].minesaround = minesCount
    setCells([...[...tmp]])
  }

  function handleMousePress(smile) {
    setAppSMILE(smile)
  }

  function handleMouseLeave(smile) {
    if (appState !== 'YOUWIN' || appState !== 'GAMEOVER') setAppSMILE(smile)
  }

  function handleClick(i, j, clickType) {
    if (clickType === 'rightClick') {
      if (cells[i][j].state === COVERED) {
        if (minesCount <= MINES_TOTAL) {
          setCell(i, j, { state: FLAG, type: cells[i][j].type, minesaround: cells[i][j].minesaround })
          setMinesCount((count) => count - 1)
        }
      } else if (cells[i][j].state === FLAG) {
        setMinesCount((count) => count + 1)
        setCell(i, j, { state: QUESTION, type: cells[i][j].type, minesaround: cells[i][j].minesaround })
      } else if (cells[i][j].state === QUESTION)
        setCell(i, j, { state: COVERED, type: cells[i][j].type, minesaround: cells[i][j].minesaround })
    } else if (clickType === 'leftClick') {
      if (appState === 'IDLE') {
        let mines = 0
        while (mines !== MINES_TOTAL) {
          mines = setRandomMines(i, j)
        }
        createDefaultTable()
        setMinesCount(mines)
        checkAllMinesAround()
        setAppState('NEWGAME')
        openCell(i, j)
      } else openCell(i, j)

      // if (cells[i][j].type === BOMB) {
      //   setCell(i, j, { state: UNCOVERED, type: EXPLOSION, minesaround: cells[i][j].minesaround })
      //   uncoverAllCells()
      //   setAppState('GAMEOVER')
      // } else openCell(i, j)
    }

    // {
    //   if (cells[i][j][0] == 'MINE') setCell(i, j, ['FREE', cells[i][j][1]])
    //   else if (cells[i][j][0] == 'FREE') setCell(i, j, ['MINE', cells[i][j][1]])
    // }
  }

  function openCell(i, j) {
    // если вышли за границы, return:
    if (i < 0 || j < 0 || i >= TABLE_SIZE || j >= TABLE_SIZE) return

    // если мина, то gameover
    if (cells[i][j].type === BOMB) {
      setCell(i, j, { state: UNCOVERED, type: EXPLOSION, minesaround: cells[i][j].minesaround })
      uncoverAllCells()
      setAppState('GAMEOVER')
      setAppSMILE('app__smile_sad')

      return
    }

    // если клетка уже открыта, return
    if (cells[i][j].state === UNCOVERED) return

    // открываем клетку
    setCell(i, j, { state: UNCOVERED, type: cells[i][j].type, minesaround: cells[i][j].minesaround })

    // и если нет мин рядом, то и все соседние через эту же функцию
    // если и там нет мин, они откроют уже свои соседние
    if (cells[i][j].minesaround === 0) {
      openCell(i - 1, j - 1)
      openCell(i, j - 1)
      openCell(i + 1, j - 1)
      openCell(i - 1, j)
      openCell(i + 1, j)
      openCell(i - 1, j + 1)
      openCell(i, j + 1)
      openCell(i + 1, j + 1)
    }
  }

  return (
    <div className="app">
      <div className="app__header">
        <div>{minesCount} mines</div>
        <button className={`app__button ${appSMILE}`} onClick={handleSmileClick}></button>
        <div>{timer} сек</div>
      </div>
      <div className="cellstable">
        {cells.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <Cell
                key={j}
                i={i}
                j={j}
                appState={appState}
                cell={cell}
                handleClick={handleClick}
                handleMousePress={handleMousePress}
                handleMouseLeave={handleMouseLeave}
              />
            )
          })
        })}
      </div>
    </div>
  )
}
export default App
