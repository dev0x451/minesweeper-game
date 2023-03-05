import './Cell.css'
import { UNCOVERED, COVERED, FREE, BOMB, EXPLOSION, FLAG, QUESTION } from './App'

function Cell({ i, j, appState, cell, handleClick, handleMousePress, handleMouseLeave }) {
  let renderedClassName = ''
  function onClick(e) {
    handleClick(i, j, 'leftClick')
  }

  const onMouseDown = (e) => {
    handleMousePress('app__smile_ohh')
  }

  const onMouseUp = (e) => {
    handleMousePress('app__smile_happy')
  }

  const onMouseLeave = (e) => {
    handleMouseLeave('app__smile_happy')
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    handleClick(i, j, 'rightClick')
  }

  let celltype
  switch (cell.type) {
    case FREE: {
      celltype = 'cell_free'
      break
    }

    case BOMB: {
      celltype = 'cell_bomb'
      break
    }
    case EXPLOSION: {
      celltype = 'cell_explosion'
      break
    }

    default:
      celltype = 'cell_free'
      break
  }

  switch (cell.state) {
    case COVERED: {
      renderedClassName = 'cell_covered'
      break
    }
    case UNCOVERED: {
      renderedClassName = celltype
      break
    }

    case FLAG: {
      renderedClassName = 'cell_flag'
      break
    }
    case QUESTION: {
      renderedClassName = 'cell_question'
      break
    }

    default:
      renderedClassName = ''
      break
  }

  let minesaround
  switch (cell.minesaround) {
    case 1: {
      minesaround = 'cell_1'
      break
    }

    case 2: {
      minesaround = 'cell_2'
      break
    }

    case 3: {
      minesaround = 'cell_3'
      break
    }
    case 4: {
      minesaround = 'cell_4'
      break
    }
    case 5: {
      minesaround = 'cell_5'
      break
    }
    case 6: {
      minesaround = 'cell_6'
      break
    }
    case 7: {
      minesaround = 'cell_7'
      break
    }
    case 8: {
      minesaround = 'cell_8'
      break
    }

    default:
      minesaround = ''
      break
  }

  if (cell.type === FREE && cell.state === UNCOVERED && cell.minesaround !== 0) renderedClassName = minesaround

  // 💣 7️⃣8️⃣9️⃣0️⃣💥❓🚩✅⏹️❎ 🙂😎

  /* <div>{cell.state === '✅' ? cell.minesaround : cell.state === 'GAMEOVER' ? cell.type : cell.state}</div> */
  /* <div>{cell.type}</div>
      {cell.minesaround}</div> */

  return (
    <div
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onContextMenu={handleContextMenu}
      className={`cell ${renderedClassName}`}
    >
      <div>{}</div>
      {/* <div>{renderedIcon}</div> */}
    </div>
  )
  //   return <div className="cell">{state === 'blank' ? 'F' : 'M'}</div>
}

export default Cell
