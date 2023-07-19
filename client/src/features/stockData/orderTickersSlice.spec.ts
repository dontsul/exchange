import { setOrderTickers, orderTickersReducer } from "./orderTickersSlice"

describe("orderTickersReducer", () => {
  it("should set order tickers correctly", () => {
    const initialState = {
      orderTickersList: [],
    }

    const action = setOrderTickers(["ticker1", "ticker2"])

    const nextState = orderTickersReducer(initialState, action)

    expect(nextState.orderTickersList).toEqual(["ticker1", "ticker2"])
  })
})
