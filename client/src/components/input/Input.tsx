import { useState, useEffect, ChangeEvent, MouseEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addNewStockData } from "../../features/stockData/stockDataSlice"

export const Input = () => {
  const dispatch = useAppDispatch()
  const { stockData } = useAppSelector((state) => state.stockData)
  const [inputValue, setInputValue] = useState<string>("")

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClick = (e: MouseEvent) => {
    const checkTicker = stockData.filter(
      (item) => item.ticker === inputValue.toUpperCase(),
    )

    if (inputValue !== "" && inputValue !== null && checkTicker.length === 0) {
      e.preventDefault()
      dispatch(addNewStockData({ ticker: inputValue }))
    }
  }
  return (
    <div className="z-0 mb-6 border-[1px] rounded-md py-4 px-8 shadow-slate-200 shadow-lg ">
      <form
        className="z-0 flex justify-between items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={inputValue}
          onChange={handleInput}
          type="text"
          placeholder="Add Your Ticker"
          id="default-input"
          className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
        />
        <button
          onClick={handleClick}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 "
        >
          Add
        </button>
      </form>
    </div>
  )
}
