import { Logo } from "../logo/Logo"

export const Header = () => {
  return (
    <header className="py-2 border-b-[1px] sticky top-0 shadow-md px-8 bg-slate-200 z-100">
      <Logo />
    </header>
  )
}
