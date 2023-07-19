import { FC, useState, useEffect, MouseEvent } from "react"
import { IStockData } from "../../features/stockData/stockDataSlice"
import { getDate } from "../../utils/getDate"
import { AiOutlineCloseCircle } from "react-icons/ai"

import { useMotionValue, Reorder } from "framer-motion"
import { useRaisedShadow } from "../../utils/use-raised-shadow"
import { removeTicker } from "../../features/stockData/stockDataSlice"
import { deleteStockData } from "../../features/stockData/stockDataSlice"
import { useAppDispatch } from "../../app/hooks"

interface IStockItem {
  stockItemData: IStockData
  prevStockItemData: IStockData
}
export const StockItem: FC<IStockItem> = ({
  stockItemData,
  prevStockItemData,
}) => {
  const {
    change,
    change_percent,
    dividend,
    exchange,
    last_trade_time,
    price,
    ticker,
    yield: yieldItem,
  } = stockItemData
  const dispatch = useAppDispatch()
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)

  const handleDelete = () => {
    dispatch(deleteStockData({ ticker }))
  }

  return (
    <Reorder.Item
      className="cursor-pointer"
      value={stockItemData}
      id={stockItemData.ticker}
      style={{ boxShadow, y }}
    >
      <div className=" border-[1px] border-slate-600 p-4 flex flex-col sm:flex-row justify-between my-1 lg:rounded-md shadow-lg bg-slate-200">
        <div className="sm:mb-0 sm:mr-4 flex md:items-start justify-start flex-col items-center">
          <div className="flex justify-between items-center">
            <div className="py-2 px-4 rounded-md bg-emerald-600 shadow-md text-slate-100 font-semibold text-[16px] text-center inline mr-4 ">
              {ticker}
            </div>
            <button className="z-100" onClick={handleDelete}>
              <AiOutlineCloseCircle size={30} color={"#f87171"} />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center font-base py-2 px-2 rounded-md font-semibold">
              Last trade:
            </div>
            <div className="flex items-center justify-center flex-col py-2 px-2 rounded-md">
              <div className="text-sm">
                {getDate(last_trade_time).formattedDate}{" "}
              </div>

              <div className="text-sm">
                {getDate(last_trade_time).formattedTime}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center justify-center gap-4">
          <div className="text-slate-900 font-medium text-center">
            {price} $
          </div>
          <div
            className={`shadow-md font-base py-2 px-4 rounded-md font-semibold text-center ${
              prevStockItemData.price < price
                ? "bg-green-300 text-green-950"
                : "bg-red-300 text-red-950"
            }`}
          >
            {prevStockItemData.price < price ? "+" : "-"}
            {change} $
          </div>
          <div
            className={`text-center font-base py-2 px-4 rounded-md font-semibold ${
              prevStockItemData.price < price
                ? "text-green-700"
                : "text-red-700"
            }`}
          >
            {prevStockItemData.price < price ? "+" : "-"}
            {change_percent} %
          </div>
          <div className="border-[1px] rounded-md shadow-md py-2 px-4 font-medium text-center bg-slate-100">
            {exchange}
          </div>
          <div className="text-center font-base py-2 px-4 rounded-md font-semibold">
            yield:{" "}
            <span
              className={` ${
                prevStockItemData.price < price
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {" "}
              {prevStockItemData.price < price ? "+" : "-"} {yieldItem} %
            </span>
          </div>

          <div className="text-center font-base py-2 px-4 rounded-md font-semibold">
            dividend: {dividend}
          </div>
        </div>
      </div>
    </Reorder.Item>
  )
}
