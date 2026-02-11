import PriceRow from "./PriceRow"

type VerticalPriceGridProps = {
  symbol: string
  prices: readonly number[]
}

const VerticalPriceGrid = ({ symbol, prices }: VerticalPriceGridProps) => {
  return (
    <section className="w-full max-w-sm overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-950/40 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_60px_rgba(0,0,0,0.55)] backdrop-blur">
      <header className="relative flex items-center justify-between border-b border-neutral-800/60 px-4 py-3">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-rose-500/10" />
        <div className="relative flex items-baseline gap-2">
          <div className="text-sm font-semibold text-neutral-100">{symbol}</div>
          <div className="text-[11px] text-neutral-400">Depth Ladder</div>
        </div>
        <div className="relative rounded-md border border-neutral-800/70 bg-neutral-950/40 px-2 py-1 text-[11px] text-neutral-400">
          DOM
        </div>
      </header>

      <div className="sticky top-0 z-10 grid grid-cols-[1fr_1fr_1fr] gap-2 border-b border-neutral-800/60 bg-neutral-950/50 px-3 py-2 text-[11px] font-medium text-neutral-400 backdrop-blur" role="row">
        <div className="text-right">Price</div>
        <div className="text-right">Bid</div>
        <div className="text-right">Ask</div>
      </div>

      <div className="max-h-[520px] overflow-auto" role="rowgroup">
        {prices.map((price) => (
          <PriceRow key={price} price={price} />
        ))}
      </div>
    </section>
  )
}

export default VerticalPriceGrid