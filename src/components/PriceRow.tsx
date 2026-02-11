import { memo } from "react"
import type { PriceLevel } from "../lib/types"

type PriceRowProps = {
  level: PriceLevel
}

const PriceRow = memo(({ level }: PriceRowProps) => {
  return (
    <div
      className="grid grid-cols-[1fr_1fr_1fr] gap-2 px-2 py-1 tabular-nums"
      role="PriceRow"
    >
      <div className="text-right font-mono" role="cell">
        {level.price.toFixed(2)}
      </div>
      <div className="text-right font-mono text-emerald-400" role="cell">
        {level.bidSize}
      </div>
      <div className="text-right font-mono text-rose-400" role="cell">
        {level.askSize}
      </div>
    </div>
  )
})

export default PriceRow