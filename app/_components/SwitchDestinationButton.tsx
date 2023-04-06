import { Repeat } from "@/assets/icons/Repeat"
import Link from "next/link"

export interface ISwitchDestinationButton {
  from: string
  to: string
  day: string
}

export const SwitchDestinationButton = ({ to, from, day }: ISwitchDestinationButton) => {
  return (
    <Link 
      aria-label="Byt håll"
      href={`/${to}/${from}/${day}`}
      className='fixed bottom-4 right-4 bg-emerald-500 dark:bg-emerald-700 p-4 rounded-full text-white'
    >
      <Repeat />
    </Link>
  )
}