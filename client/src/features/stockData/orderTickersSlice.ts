import { createSlice } from "@reduxjs/toolkit"

export interface IOrderTickers {
  orderTickersList: string[]
}

const initialState: IOrderTickers = {
  orderTickersList: [],
}

export const orderTickersSlice = createSlice({
  name: "orderTickers",
  initialState,
  reducers: {
    setOrderTickers: (state, action) => {
      state.orderTickersList = action.payload
    },
  },
})

export const orderTickersReducer = orderTickersSlice.reducer
export const { setOrderTickers } = orderTickersSlice.actions
