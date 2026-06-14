import { useState, useRef } from 'react'

export default function GuessInput({ digits, onSubmit }: { digits: number; onSubmit: (guess: string) => void }) {
  const [values, setValues] = useState<string[]>(Array(digits).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  function handleInput(i: number, val: string) {
    if (!/^\d*$/.test(val)) return
    const ch = val.slice(-1)
    setValues(prev => prev.map((v, idx) => (idx === i ? ch : v)))
    if (ch && i < digits - 1) inputRefs.current[i + 1]?.focus()
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !values[i] && i > 0) inputRefs.current[i - 1]?.focus()
    if (e.key === 'Enter') submit()
  }

  function submit() {
    if (values.some(v => v === '')) return
    onSubmit(values.join(''))
    setValues(Array(digits).fill(''))
    setTimeout(() => inputRefs.current[0]?.focus(), 0)
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      {values.map((v, i) => (
        <input
          key={i}
          ref={el => { inputRefs.current[i] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={e => handleInput(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          className="w-11 h-11 text-center text-lg font-bold text-white bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500"
        />
      ))}
      <button
        onClick={submit}
        className="ml-2 px-4 h-11 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors"
      >
        GO
      </button>
    </div>
  )
}
