function Square({ value, onClick, isWinning, disabled }) {
  const colorClass =
    value === 'X'
      ? 'text-sky-600'
      : value === 'O'
        ? 'text-rose-500'
        : 'text-slate-300'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={value ? `ช่อง ${value}` : 'ช่องว่าง'}
      className={`aspect-square w-full rounded-xl border-2 text-4xl font-bold transition-all duration-150 sm:text-5xl md:text-6xl ${colorClass} ${
        isWinning
          ? 'border-emerald-400 bg-emerald-50'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 active:scale-95'
      } ${!disabled && value === null ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {value}
    </button>
  )
}

export default Square
