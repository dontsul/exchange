import "./App.css"

import { StockList } from "./components/stockList/StockList"
import { Header } from "./components/header/Header"
import { CustomSelect } from "./components/customSelect/CustomSelect"
import { Input } from "./components/input/Input"

function App() {
  return (
    <div>
      <Header />
      <main className="w-full md:w-[90%] max-w-[1200px] mx-auto py-14">
        <Input />
        <CustomSelect />
        <StockList />
      </main>
    </div>
  )
}

export default App
