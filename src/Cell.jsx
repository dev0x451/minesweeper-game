import './Cell.css'
import { UNCOVERED, COVERED, FREE, BOMB, EXPLOSION, FLAG, QUESTION } from './App'

function Cell({ i, j, cell, handleClick, handleSmileChange }) {
  let renderedClassName = ''
  function onClick() {
    handleClick(i, j, 'leftClick')
  }

  const onMouseDown = () => {
    handleSmileChange('app__smile_ohh')
  }

  const onMouseUp = () => {
    handleSmileChange('app__smile_happy')
  }

  const onMouseLeave = () => {
    handleSmileChange('app__smile_happy')
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

  return (
    <div
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onContextMenu={handleContextMenu}
      className={`cell ${renderedClassName}`}
    ></div>
  )
}

export default Cell
