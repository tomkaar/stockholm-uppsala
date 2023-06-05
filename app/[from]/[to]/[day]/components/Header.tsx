import { FAQ } from "./FAQ"

export interface IHeader {
  from: string
  to: string
}

export function Header({ from, to }: IHeader) {
  return (
    <header className="sticky top-0 z-20 flex flex-row justify-center items-center py-4 px-4 bg-white dark:bg-slate-900 border-b border-slate-900/10 dark:border-slate-700">
      <h1 className="text-slate-900 dark:text-white text-xl tracking-light text-center font-bold">
        {from}
        &nbsp;&nbsp;
        <span className="inline-block scale-x-[-1]">🚂</span>
        &nbsp;&nbsp;
        {to}
      </h1>

      <FAQ />
    </header>
  )
}
