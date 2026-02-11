import { memo, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLevelByPrice } from '../redux/slices/levels'
import type { RootState } from '../redux/store'
import type { PriceLevel } from '../lib/types'

type PriceRowProps = {
  price: number
}

type Flash = {
  bid: 'up' | 'down' | null
  ask: 'up' | 'down' | null
}

const PriceRow = memo(({ price }: PriceRowProps) => {

  const level = useSelector<RootState, PriceLevel | null>((state) => selectLevelByPrice(state, price))
  const prevPriceRef = useRef<{ bid?: number; ask?: number }>({})

  const flashScheduleTimeout = useRef(null)
  const flashTimeout = useRef(null)
  const [flash, setFlash] = useState<Flash>({
    bid: null,
    ask: null,
  })

  useEffect(() => {
    if (!level) return

    const { bidSize, askSize } = level
    const { bid: prevBid, ask: prevAsk } = prevPriceRef.current

    const nextFlash: Flash = {
      bid: typeof prevBid === 'number' && bidSize !== prevBid ? (bidSize > prevBid ? 'up' : 'down') : null,
      ask: typeof prevAsk === 'number' && askSize !== prevAsk ? (askSize > prevAsk ? 'up' : 'down') : null,
    }

    if (nextFlash.bid || nextFlash.ask) {
      if (flashTimeout.current) window.clearTimeout(flashTimeout.current)
      if (flashScheduleTimeout.current) window.clearTimeout(flashScheduleTimeout.current)

      flashScheduleTimeout.current = window.setTimeout(() => {
        setFlash(nextFlash)
        flashTimeout.current = window.setTimeout(() => setFlash({ bid: null, ask: null }), 500)
      }, 0)
    }

    prevPriceRef.current = { bid: level.bidSize, ask: level.askSize }

    return () => {
      if (flashScheduleTimeout.current) window.clearTimeout(flashScheduleTimeout.current)
      if (flashTimeout.current) window.clearTimeout(flashTimeout.current)
    }
  }, [level])

  return (
    <div
      className="grid grid-cols-[1fr_1fr_1fr] gap-2 px-2 py-1 tabular-nums"
      role="row"
    >
      <div className="text-right font-mono" role="cell">
        {price.toFixed(2)}
      </div>
      <div
        className={
          'text-right font-mono text-emerald-400 transition-colors duration-150 ' +
          (flash.bid === 'up' ? 'bg-emerald-500/25' : flash.bid === 'down' ? 'bg-rose-500/25' : '')
        }
        role="cell"
      >
        {level?.bidSize ?? ''}
      </div>
      <div
        className={
          'text-right font-mono text-rose-400 transition-colors duration-150 ' +
          (flash.ask === 'up' ? 'bg-emerald-500/25' : flash.ask === 'down' ? 'bg-rose-500/25' : '')
        }
        role="cell"
      >
        {level?.askSize ?? ''}
      </div>
    </div>
  )
})

export default PriceRow