import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PriceLevel } from '../../../lib/types'
import type { RootState } from '../../store'

type LevelsState = {
  levelsByPrice: Record<string, PriceLevel | null>
}

const initialState: LevelsState = {
  levelsByPrice: {},
}

export const levelsSlice = createSlice({
  name: 'levels',
  initialState,
  reducers: {
    upsertLevel: (state, { payload }: PayloadAction<PriceLevel>) => {
      state.levelsByPrice[String(payload.price)] = payload
    },
  },
})

export const { upsertLevel } = levelsSlice.actions

export const selectLevelByPrice = (state: RootState, price: number): PriceLevel | null =>
  state.levels.levelsByPrice[String(price)] ?? null

export default levelsSlice.reducer
