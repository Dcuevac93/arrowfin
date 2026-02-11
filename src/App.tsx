import VerticalPriceGrid from './components/VerticalPriceGrid'
import useLevelsWebSocket from './hooks/useLevelsWebSocket'
import type { PriceLevel } from './lib/types'

function App() {
  const levels: PriceLevel[] = useLevelsWebSocket<PriceLevel>('ws://localhost:8080')

  console.log(levels);

  return (
    <main className="min-h-dvh bg-neutral-950 p-6 text-neutral-100">
      <div className="mx-auto flex w-full flex-col gap-6">
        <h1 className="text-lg font-semibold">Trading Ladder</h1>
        <VerticalPriceGrid symbol="TEST" levels={levels} />
      </div>
    </main>
  )
}

export default App
