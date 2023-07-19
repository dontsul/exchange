import { store } from "../../app/store"
import {
  getStockData,
  addNewStockData,
  deleteStockData,
  stockDataSlice,
} from "./stockDataSlice"

describe("stockDataSlice", () => {
  afterEach(() => {
    store.dispatch(stockDataSlice.actions.addStockData([]))
    store.dispatch(stockDataSlice.actions.addPrevStockData([]))
  })

  test("getStockData", async () => {
    await store.dispatch(getStockData())
    const state = store.getState().stockData

    expect(state.isLoading).toBe(false)
    expect(state.error).toBe(null)
    expect(state.prevStockData).toEqual([])
    expect(state.stockData).toEqual([])
  })

  test("addNewStockData", async () => {
    const ticker = "AAPL"
    await store.dispatch(addNewStockData({ ticker }))
    const state = store.getState().stockData

    expect(state.isLoading).toBe(false)
    expect(state.error).toBe(null)
    expect(state.stockData.length).toBe(1)
    expect(state.stockData[0].ticker).toBe(ticker)
  })

  test("deleteStockData", async () => {
    const ticker = "AAPL"
    await store.dispatch(deleteStockData({ ticker }))
    const state = store.getState().stockData

    expect(state.isLoading).toBe(false)
    expect(state.error).toBe(null)
    expect(state.prevStockData).toEqual([])
    expect(state.stockData).toEqual([])
  })
})
