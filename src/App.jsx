import { useState } from 'react'
import Board from './components/Board'
import { calculateWinner, isBoardFull } from './lib/gameLogic'

const EMPTY_BOARD = Array(9).fill(null)

function App() {
  const [squares, setSquares] = useState(EMPTY_BOARD)
  const [xIsNext, setXIsNext] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })

  const result = calculateWinner(squares)
  const winner = result?.player ?? null
  const winningLine = result?.line ?? null
  const draw = !winner && isBoardFull(squares)
  const gameOver = Boolean(winner) || draw

  function handleSquareClick(index) {
    if (squares[index] || gameOver) return

    const nextSquares = squares.slice()
    nextSquares[index] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)

    const nextResult = calculateWinner(nextSquares)
    if (nextResult) {
      setScores((prev) => ({ ...prev, [nextResult.player]: prev[nextResult.player] + 1 }))
    } else if (isBoardFull(nextSquares)) {
      setScores((prev) => ({ ...prev, draw: prev.draw + 1 }))
    }

    setXIsNext(!xIsNext)
  }

  function handleNewRound() {
    setSquares(EMPTY_BOARD)
    setXIsNext(true)
  }

  function handleResetScores() {
    setSquares(EMPTY_BOARD)
    setXIsNext(true)
    setScores({ X: 0, O: 0, draw: 0 })
  }

  let status
  if (winner) {
    status = `ผู้เล่น ${winner} ชนะ!`
  } else if (draw) {
    status = 'เสมอ!'
  } else {
    status = `ตาของผู้เล่น ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <div className="flex min-h-svh w-full flex-col items-center bg-slate-50 px-4 py-8 sm:py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            เกม OX
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Tic-Tac-Toe สองผู้เล่น
          </p>
        </header>

        <div className="grid w-full grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:gap-3 sm:p-4">
          <ScoreCard label="X" value={scores.X} color="text-sky-600" />
          <ScoreCard label="เสมอ" value={scores.draw} color="text-slate-500" />
          <ScoreCard label="O" value={scores.O} color="text-rose-500" />
        </div>

        <div
          role="status"
          aria-live="polite"
          className={`rounded-full px-5 py-2 text-base font-semibold sm:text-lg ${
            winner
              ? 'bg-emerald-100 text-emerald-700'
              : draw
                ? 'bg-amber-100 text-amber-700'
                : 'bg-slate-200 text-slate-700'
          }`}
        >
          {status}
        </div>

        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
          disabled={gameOver}
        />

        <div className="flex w-full gap-3">
          <button
            type="button"
            onClick={handleNewRound}
            className="flex-1 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 active:bg-sky-800 sm:text-base"
          >
            เริ่มรอบใหม่
          </button>
          <button
            type="button"
            onClick={handleResetScores}
            className="flex-1 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200 sm:text-base"
          >
            รีเซ็ตคะแนน
          </button>
        </div>
      </div>
    </div>
  )
}

function ScoreCard({ label, value, color }) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-xl bg-slate-50 py-2">
      <span className={`text-xs font-medium sm:text-sm ${color}`}>{label}</span>
      <span className="text-xl font-bold text-slate-800 sm:text-2xl">{value}</span>
    </div>
  )
}

export default App
