export type GuessRecord = {
  guess: string
  result: {
    rightPlace: number
    wrongPlace: number
    wrong: number
  }
}

export default function HistoryList({ history }: { history: GuessRecord[] }) {
  if (history.length === 0) {
    return <p className="text-slate-500 text-sm text-center py-4">No guesses yet</p>
  }

  return (
    <div className="max-h-64 overflow-y-auto flex flex-col gap-2 pr-1">
      {history.map((record, idx) => {
        const { rightPlace, wrongPlace, wrong } = record.result
        return (
          <div
            key={idx}
            className="grid grid-cols-[2rem_max-content_1fr] bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 gap-3"
          >
            <span className="text-slate-400 text-xs font-mono self-center">#{history.length - idx}</span>

            <span className="text-white font-bold tracking-[6px] font-mono text-sm self-center">
              {record.guess.split('').join(' ')}
            </span>

            <span className="text-xs leading-5 self-center">
              {rightPlace > 0 && <span className="text-emerald-400">{rightPlace} right place</span>}
              {rightPlace > 0 && (wrongPlace > 0 || wrong > 0) && <span className="text-slate-500"> · </span>}
              {wrongPlace > 0 && <span className="text-amber-400">{wrongPlace} wrong place</span>}
              {wrongPlace > 0 && wrong > 0 && <span className="text-slate-500"> · </span>}
              {wrong > 0 && <span className="text-slate-500">{wrong} wrong</span>}
            </span>
          </div>
        )
      })}
    </div>
  )
}
