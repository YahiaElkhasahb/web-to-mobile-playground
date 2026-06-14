import { useState } from 'react'
import type { GameConfig } from '../App'
import GuessInput from './GuessInput'
import HistoryList from './HistoryList'
import type { GuessRecord } from './HistoryList'

function evaluate(secret: string, guess: string): GuessRecord['result'] {
  const n = secret.length
  const secretUsed = Array(n).fill(false)
  const guessUsed = Array(n).fill(false)
  let rightPlace = 0
  let wrongPlace = 0

  // Pass 1: exact matches
  for (let i = 0; i < n; i++) {
    if (guess[i] === secret[i]) {
      rightPlace++
      secretUsed[i] = true
      guessUsed[i] = true
    }
  }

  // Pass 2: misplaced — only against unclaimed secret digits
  for (let i = 0; i < n; i++) {
    if (guessUsed[i]) continue
    for (let j = 0; j < n; j++) {
      if (secretUsed[j]) continue
      if (guess[i] === secret[j]) {
        wrongPlace++
        secretUsed[j] = true
        break
      }
    }
  }

  return { rightPlace, wrongPlace, wrong: n - rightPlace - wrongPlace }
}

export default function GameScreen({ config, onReset }: { config: GameConfig; onReset: () => void }) {
  const [history, setHistory] = useState<GuessRecord[]>([])
  const [won, setWon] = useState(false)

  function handleGuess(guess: string) {
    const result = evaluate(config.secret, guess)
    setHistory(prev => [{ guess, result }, ...prev])
    if (result.rightPlace === config.digits) setWon(true)
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-xs uppercase tracking-widest">Guesses</p>
        <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono px-3 py-1 rounded-full">
          {history.length}
        </span>
      </div>

      {won && (
        <div className="bg-emerald-950 border border-emerald-600 text-emerald-400 rounded-xl px-4 py-3 text-center">
          <p className="font-bold text-sm">
            You cracked it in {history.length} {history.length === 1 ? 'guess' : 'guesses'}!
          </p>
          <p className="text-xs mt-1 text-emerald-500">
            Secret: <span className="font-mono font-bold tracking-widest">{config.secret}</span>
          </p>
        </div>
      )}

      {!won && <GuessInput digits={config.digits} onSubmit={handleGuess} />}

      <HistoryList history={history} />

      <button
        onClick={onReset}
        className="mt-2 w-full py-2 border border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-400 rounded-xl text-sm font-medium transition-colors"
      >
        New Game
      </button>
    </div>
  )
}
