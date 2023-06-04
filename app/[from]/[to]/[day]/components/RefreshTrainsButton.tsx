"use client"

import { useRouter } from "next/navigation"

import { Refresh } from "@/assets/icons/Refresh"

export const RefreshTrainsButton = () => {
  const router = useRouter()

  return (
    <button
      aria-label="Hämta listan med tåg igen"
      onClick={() => router.refresh()}
      className="fixed bottom-4 left-4 bg-emerald-500 dark:bg-emerald-700 p-4 rounded-full text-white"
    >
      <Refresh />
    </button>
  )
}
