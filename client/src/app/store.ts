import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { stockDataReducer } from "../features/stockData/stockDataSlice"
import { orderTickersReducer } from "../features/stockData/orderTickersSlice"

export const store = configureStore({
  reducer: {
    stockData: stockDataReducer,
    orderTickers: orderTickersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
