import { IStockData } from "../features/stockData/stockDataSlice"

export const sortDataByTickers = (
  data: IStockData[],
  tickers: string[],
): IStockData[] => {
  const sortedData: IStockData[] = []

  tickers.forEach((ticker) => {
    const foundItem = data.find((item) => item.ticker === ticker)
    if (foundItem) {
      sortedData.push(foundItem)
    } else {
      const index = data.findIndex((elem) => elem.ticker === ticker)
      sortedData.push(data[index])
    }
  })

  return sortedData
}
