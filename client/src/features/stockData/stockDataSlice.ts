import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { io } from "socket.io-client"
import { sortDataByTickers } from "../../utils/sortDataByTickers"
import { RootState } from "../../app/store"

export interface IStockData {
  change: string
  change_percent: string
  dividend: string
  exchange: string
  last_trade_time: string
  price: string
  ticker: string
  yield: string
}

interface initialStateProps {
  prevStockData: IStockData[]
  stockData: IStockData[]
  error: null | string
  isLoading: boolean
  interval: number
}

const initialState: initialStateProps = {
  prevStockData: [],
  stockData: [],
  error: null,
  isLoading: false,
  interval: 5000,
}

export interface IAppState {
  orderTickers: string[]
  stockData: initialStateProps
}

const API_URL = "http://localhost:4000"
const socket = io(API_URL)

export const addNewStockData = createAsyncThunk(
  "stock/addNewStockData",
  async ({ ticker }: { ticker: string }) => {
    try {
      const res = await fetch(`${API_URL}/api/tickers`, {
        headers: {
          "Content-Type": " application/json",
        },
        method: "POST",
        body: JSON.stringify({ ticker }),
      })
      const data = await res.json()

      return data
    } catch (error) {}
  },
)
export const deleteStockData = createAsyncThunk(
  "stock/deleteStockData",
  async ({ ticker }: { ticker: string }) => {
    try {
      const res = await fetch(`${API_URL}/api/tickers`, {
        headers: {
          "Content-Type": " application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ ticker }),
      })
      const data = await res.json()

      return data
    } catch (error) {}
  },
)

export const getStockData = createAsyncThunk(
  "stock/fetchStockData",
  async (_, { getState, dispatch }) => {
    try {
      socket.on("ticker", (data) => {
        const state = getState() as RootState

        socket.emit("changeInterval", state.stockData.interval)
        const order: string[] = state.orderTickers.orderTickersList

        const prevStock: IStockData[] = state.stockData.stockData
        dispatch(stockDataSlice.actions.addPrevStockData(prevStock))

        if (order.length === 0) {
          dispatch(stockDataSlice.actions.addStockData(data))
        } else {
          const sortedData = sortDataByTickers(data, order)
          dispatch(stockDataSlice.actions.addStockData(sortedData))
        }
      })
      socket.on("error", (error) => {
        console.log(error)
      })

      socket.emit("start")
    } catch (error) {
      console.error("Error", error)
      throw error
    }
  },
)

export const stockDataSlice = createSlice({
  name: "stockData",
  initialState,
  reducers: {
    addStockData: (state, action) => {
      state.stockData = action.payload
    },
    addPrevStockData: (state, action) => {
      state.prevStockData = action.payload
    },
    changeInterval: (state, action) => {
      state.interval = action.payload
    },
    removeTicker: (state, action) => {
      state.prevStockData = state.prevStockData.filter(
        (item) => item.ticker !== action.payload,
      )
      state.stockData = state.stockData.filter(
        (item) => item.ticker !== action.payload,
      )
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStockData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStockData.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(getStockData.rejected, (state) => {
        state.isLoading = false
        state.error = "error"
      })
      // ---------------------------------------
      .addCase(deleteStockData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteStockData.fulfilled, (state, action) => {
        state.isLoading = false

        state.prevStockData = state.prevStockData.filter(
          (item) => item.ticker !== action.payload.data,
        )
        state.stockData = state.stockData.filter(
          (item) => item.ticker !== action.payload.data,
        )
      })
      .addCase(deleteStockData.rejected, (state) => {
        state.isLoading = false
        state.error = "error"
      })
      // ---------------------------------------
      .addCase(addNewStockData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addNewStockData.fulfilled, (state, action) => {
        state.isLoading = false
        state.stockData.push(action.payload.data)
      })
      .addCase(addNewStockData.rejected, (state) => {
        state.isLoading = false
        state.error = "error"
      })
  },
})

export const stockDataReducer = stockDataSlice.reducer
export const { addStockData, changeInterval, removeTicker } =
  stockDataSlice.actions
