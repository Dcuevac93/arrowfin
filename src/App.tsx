import VerticalPriceGrid from './components/VerticalPriceGrid'
import useLevelsWebSocket from './hooks/useLevelsWebSocket'
import type { PriceLevel } from './lib/types'
import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { upsertLevel } from './redux/slices/levels'
import type { AppDispatch } from './redux/store'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  const prices = useMemo(() => {
    const mid = 100.0
    const tick = 0.25
    const count = 20

    return Array.from({ length: count }, (_, i) => mid + (Math.floor(count / 2) - i) * tick)
  }, [])

  const handleLevel = useCallback(
    (level: PriceLevel) => {
      dispatch(upsertLevel(level))
    },
    [dispatch],
  )

  useLevelsWebSocket<PriceLevel>('ws://localhost:8080', handleLevel)

  return (
    <main className="min-h-dvh bg-neutral-950 p-6 text-neutral-100">
      <div className="mx-auto flex w-full flex-col gap-6">
        <h1 className="text-lg font-semibold">Trading Ladder</h1>
        <VerticalPriceGrid symbol="TEST" prices={prices} />
      </div>
    </main>
  )
}

export default App
