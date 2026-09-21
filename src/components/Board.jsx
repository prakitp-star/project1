import Square from './Square'

function Board({ squares, onSquareClick, winningLine, disabled }) {
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-2 sm:gap-3">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinning={winningLine?.includes(index) ?? false}
          disabled={disabled}
        />
      ))}
    </div>
  )
}

export default Board
