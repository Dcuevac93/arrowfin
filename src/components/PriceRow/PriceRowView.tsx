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
      className="grid grid-cols-[1fr_1fr_1fr] gap-2 border-b border-neutral-900/60 px-3 py-1.5 tabular-nums hover:bg-white/[0.02]"
      role="row"
    >
      <div className="text-right font-mono" role="cell">
        {price.toFixed(2)}
      </div>
      <div
        className={
          (onBidClick
            ? 'cursor-pointer select-none hover:bg-emerald-500/10 active:bg-emerald-500/15 focus-visible:bg-emerald-500/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/40 '
            : '') +
          'rounded-sm px-1 text-right font-mono text-emerald-300 transition-colors duration-150 ' +
          (flash.bid === 'up' ? 'bg-emerald-500/25' : flash.bid === 'down' ? 'bg-rose-500/25' : '')
        }
        role="cell"
        onClick={onBidClick}
        tabIndex={onBidClick ? 0 : -1}
        onKeyDown={(e) => {
          if (!onBidClick) return
          if (e.key === 'Enter' || e.key === ' ') onBidClick()
        }}
        aria-label={`Buy limit at ${price.toFixed(2)}`}
      >
        {bidSize ?? ''}
      </div>
      <div
        className={
          (onAskClick
            ? 'cursor-pointer select-none hover:bg-rose-500/10 active:bg-rose-500/15 focus-visible:bg-rose-500/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-500/40 '
            : '') +
          'rounded-sm px-1 text-right font-mono text-rose-300 transition-colors duration-150 ' +
          (flash.ask === 'up' ? 'bg-emerald-500/25' : flash.ask === 'down' ? 'bg-rose-500/25' : '')
        }
        role="cell"
        onClick={onAskClick}
        tabIndex={onAskClick ? 0 : -1}
        onKeyDown={(e) => {
          if (!onAskClick) return
          if (e.key === 'Enter' || e.key === ' ') onAskClick()
        }}
        aria-label={`Sell limit at ${price.toFixed(2)}`}
      >
        {askSize ?? ''}
      </div>
    </div>
  )
})

export default PriceRowView
