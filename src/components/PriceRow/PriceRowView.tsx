import { memo } from 'react'
import type { Flash } from '../../lib/types'

type PriceRowViewProps = {
  price: number
  bidSize: number | null
  askSize: number | null
  flash: Flash
  onBidClick: (() => void) | undefined
  onAskClick: (() => void) | undefined
}

const PriceRowView = memo(({ price, bidSize, askSize, flash, onBidClick, onAskClick }: PriceRowViewProps) => {
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
          (onBidClick ? 'cursor-pointer ' : '') +
          'text-right font-mono text-emerald-400 transition-colors duration-150 ' +
          (flash.bid === 'up' ? 'bg-emerald-500/25' : flash.bid === 'down' ? 'bg-rose-500/25' : '')
        }
        role="cell"
        onClick={onBidClick}
      >
        {bidSize ?? ''}
      </div>
      <div
        className={
          (onAskClick ? 'cursor-pointer ' : '') +
          'text-right font-mono text-rose-400 transition-colors duration-150 ' +
          (flash.ask === 'up' ? 'bg-emerald-500/25' : flash.ask === 'down' ? 'bg-rose-500/25' : '')
        }
        role="cell"
        onClick={onAskClick}
      >
        {askSize ?? ''}
      </div>
    </div>
  )
})

export default PriceRowView
