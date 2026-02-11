import { configureStore } from '@reduxjs/toolkit'
import levelsReducer from './slices/levels'

export const store = configureStore({
  reducer: {
    levels: levelsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
