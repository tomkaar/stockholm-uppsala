"use client"

import { useRouter } from "next/navigation"

import { ArrowsRound } from "@/assets/icons/ArrowsRound"

export const RefreshTrainsButton = () => {
  const router = useRouter()

  return (
    <button
      aria-label="Hämta listan med tåg igen"
      onClick={() => router.refresh()}
      className="fixed bottom-4 left-4 bg-emerald-500 dark:bg-emerald-700 p-2 rounded-full text-white"
    >
      <ArrowsRound width={32} height={32} className="rotate-90" />
    </button>
  )
}
