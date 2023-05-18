import { Repeat } from "@/assets/icons/Repeat"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const SwitchDestinationButton = () => {
  const pathname = usePathname()
  const [_, from, to, day] = (pathname ?? "")?.split("/")

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