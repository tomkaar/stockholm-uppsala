"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ArrowsExchange } from "@/assets/icons/ArrowsExchange"

export const SwitchDestinationButton = () => {
  const pathname = usePathname()
  const [_, from, to, day] = (pathname ?? "")?.split("/")

  return (
    <Link
      prefetch={false}
      aria-label="Byt håll"
      href={`/${to}/${from}/${day}`}
      className="fixed bottom-4 right-4 bg-emerald-500 dark:bg-emerald-700 p-2.5 rounded-full text-white"
    >
      <ArrowsExchange width={36} height={36} className="rotate-90" />
    </Link>
  )
}
