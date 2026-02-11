import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectLevelByPrice } from '../redux/slices/levels'
import type { RootState } from '../redux/store'
import type { PriceLevel } from '../lib/types'

type PriceRowProps = {
  price: number
}

const PriceRow = memo(({ price }: PriceRowProps) => {
  const level = useSelector<RootState, PriceLevel | undefined>((state) => selectLevelByPrice(state, price))

  return (
    <div
      className="grid grid-cols-[1fr_1fr_1fr] gap-2 px-2 py-1 tabular-nums"
      role="row"
    >
      <div className="text-right font-mono" role="cell">
        {price.toFixed(2)}
      </div>
      <div className="text-right font-mono text-emerald-400" role="cell">
        {level?.bidSize ?? ''}
      </div>
      <div className="text-right font-mono text-rose-400" role="cell">
        {level?.askSize ?? ''}
      </div>
    </div>
  )
})

export default PriceRow