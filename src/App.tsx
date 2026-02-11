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
    <main className="min-h-dvh px-6 py-10 text-neutral-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Arrowfin</h1>
            <div className="rounded-full border border-neutral-800/80 bg-neutral-950/40 px-3 py-1 text-[11px] text-neutral-400 backdrop-blur">
              WebSocket: ws://localhost:8080
            </div>
          </div>
          <div className="text-sm text-neutral-400">
            Depth ladder with quick order entry (click bid/ask sizes)
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <VerticalPriceGrid symbol="BTC/USD" prices={prices} />
          <section className="hidden rounded-xl border border-neutral-800/60 bg-neutral-950/40 p-4 text-sm text-neutral-300 backdrop-blur lg:block">
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Tips</div>
            <div className="mt-3 grid gap-2">
              <div>Activate react render highlighting to check performance impact</div>
              <div>Click a bid size to log a Buy Limit.</div>
              <div>Click an ask size to log a Sell Limit.</div>
              <div>Flashes indicate size changes (up/down).</div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default App
