import { useState } from 'react'
import SetupScreen from './components/SetupScreen'
import GameScreen from './components/GameScreen'

export type GameConfig = {
  digits: number
  secret: string
}

export default function App() {
  const [config, setConfig] = useState<GameConfig | null>(null)

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">

        <div className="bg-slate-800 px-6 py-4 text-center border-b border-slate-700">
          <h1 className="text-xl font-bold tracking-[4px] text-slate-100">CIPHER</h1>
          <p className="text-slate-500 text-xs mt-1">crack the secret number</p>
        </div>

        {!config
          ? <SetupScreen onStart={setConfig} />
          : <GameScreen config={config} onReset={() => setConfig(null)} />
        }
      </div>
    </div>
  )
}
