import { useState, useRef } from 'react'
import type { GameConfig } from '../App'

export default function SetupScreen({ onStart }: { onStart: (config: GameConfig) => void }) {
  const [digits, setDigits] = useState(4)
  const [valueMap, setValueMap] = useState<Record<number, string[]>>({ 4: Array(4).fill('') })
  const [error, setError] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const values = valueMap[digits] ?? Array(digits).fill('')

  function changeDigits(n: number) {
    setDigits(n)
    setError('')
    setValueMap(prev => ({ ...prev, [n]: prev[n] ?? Array(n).fill('') }))
    setTimeout(() => inputRefs.current[0]?.focus(), 0)
  }

  function handleInput(i: number, val: string) {
    if (!/^\d*$/.test(val)) return
    const ch = val.slice(-1)
    setValueMap(prev => ({ ...prev, [digits]: values.map((v, idx) => (idx === i ? ch : v)) }))
    setError('')
    if (ch && i < digits - 1) inputRefs.current[i + 1]?.focus()
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !values[i] && i > 0) inputRefs.current[i - 1]?.focus()
    if (e.key === 'Enter') handleStart()
  }

  function handleStart() {
    if (values.some(v => v === '')) {
      setError('Please fill all digit boxes')
      return
    }
    onStart({ digits, secret: values.join('') })
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-3">Number of digits</p>
        <div className="flex gap-2">
          {[3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => changeDigits(n)}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${
                digits === n
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-slate-400 text-xs uppercase tracking-widest mb-3">Secret number</p>
        <div className="flex gap-2 justify-center">
          {values.map((v, i) => (
            <input
              key={`${digits}-${i}`}
              ref={el => { inputRefs.current[i] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={v}
              onChange={e => handleInput(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-12 h-12 text-center text-xl font-bold text-white bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          ))}
        </div>
        {error && <p className="text-red-400 text-xs mt-2 text-center">{error}</p>}
      </div>

      <button
        type="button"
        onClick={handleStart}
        className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors"
      >
        START GAME
      </button>
    </div>
  )
}
