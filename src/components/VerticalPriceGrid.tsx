import type { PriceLevel } from "../lib/types"
import PriceRow from "./PriceRow"

type VerticalPriceGridProps = {
  symbol: string
  levels?: PriceLevel[]
}

const VerticalPriceGrid = ({ symbol, levels }: VerticalPriceGridProps) => {
  return (
    <section className="w-full max-w-sm rounded-lg border border-neutral-800 bg-neutral-950/60">
      <header className="flex items-center justify-between border-b border-neutral-800 px-3 py-2">
        <div className="text-sm font-semibold text-neutral-100">{symbol}</div>
        <div className="text-xs text-neutral-400">DOM</div>
      </header>

      <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 px-2 py-2 text-xs text-neutral-400" role="row">
        <div className="text-right" role="columnheader">
          Price
        </div>
        <div className="text-right" role="columnheader">
          Bid
        </div>
        <div className="text-right" role="columnheader">
          Ask
        </div>
      </div>

      <div className="max-h-[520px] overflow-auto" role="rowgroup">
        {levels?.length && levels.map((level) => (
          <PriceRow key={level.price} level={level} />
        ))}
      </div>
    </section>
  )
}

export default VerticalPriceGrid