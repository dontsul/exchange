import { StockItem } from "../stockItem/StockItem"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { getStockData } from "../../features/stockData/stockDataSlice"
import { Reorder } from "framer-motion"
import { useState } from "react"
import { IStockData } from "../../features/stockData/stockDataSlice"
import { setOrderTickers } from "../../features/stockData/orderTickersSlice"
export const StockList = () => {
  const { stockData } = useAppSelector((state) => state.stockData)
  const { prevStockData } = useAppSelector((state) => state.stockData)
  const [items, setItems] = useState<IStockData[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getStockData())
  }, [dispatch])

  useEffect(() => {
    setItems(stockData)
  }, [stockData])

  useEffect(() => {
    const orderTickers = items.map((t) => t.ticker)
    dispatch(setOrderTickers(orderTickers))
  }, [items])

  return (
    <Reorder.Group axis="y" onReorder={setItems} values={items}>
      {items.map((stockItemData) => {
        const prevStockItemData = prevStockData.find(
          (item) => item.ticker === stockItemData.ticker,
        ) as IStockData
        return (
          <StockItem
            key={stockItemData.ticker}
            stockItemData={stockItemData}
            prevStockItemData={
              prevStockItemData ? prevStockItemData : ({} as IStockData)
            }
          />
        )
      })}
    </Reorder.Group>
  )
}
