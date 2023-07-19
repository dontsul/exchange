import { useEffect, ChangeEvent, useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { changeInterval } from "../../features/stockData/stockDataSlice"

export const CustomSelect = () => {
  const [selectValue, setSelectValue] = useState<string>("5000")
  const dispatch = useAppDispatch()
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value)

    dispatch(changeInterval(e.target.value))
  }
  return (
    <div className="mb-14 border-[1px] rounded-md py-4 px-8 shadow-slate-200 shadow-lg">
      <label className="text-slate-800 text-lg font-medium">
        select interval:
        <select
          value={selectValue}
          onChange={handleSelect}
          className="focus:otline-none focus:border:none border-[1px] rounded-md shadow-md py-2 px-6 fo mx-8 w-[140px]"
          name=""
          id=""
        >
          <option value="5000">5</option>
          <option value="10000">10</option>
          <option value="20000">20</option>
          <option value="60000">60</option>
        </select>
      </label>
    </div>
  )
}
