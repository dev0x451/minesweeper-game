import './Cell.css'
function Cell({ i, j, cell, handleClick }) {
  // const [value, setValue] = useState('left or right click')

  function onClick(e) {
    handleClick(i, j, 'leftClick')
  }

  const handleMouseDown = (e) => {
    // if (e.button === 2) return
    // console.log('handleMouseDown')
  }

  const handleMouseUp = (e) => {
    // if (e.button === 2) return
    // console.log('handleMouseUp')
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    handleClick(i, j, 'rightClick')
  }

  return (
    <div
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={handleContextMenu}
      className="cell"
    >
      <div>{cell.state}</div>
      <div>{cell.type}</div>
      <div>Рядом мин {cell.minesaround}</div>
      {/* <div>{cell[0]}</div>
      <div>{cell[1]}</div>
      <div>Рядом мин {cell[2]}</div> */}
    </div>
  )
  //   return <div className="cell">{state === 'blank' ? 'F' : 'M'}</div>
}

export default Cell
