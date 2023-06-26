"use client"

import { useRouter } from "next/navigation"

import { ArrowsRound } from "@/assets/icons/ArrowsRound"

export function PartialFetchError() {
  const router = useRouter()

  return (
    <div className="flex items-center bg-rose-500 dark:bg-orange-600 rounded-lg py-2 pl-4 pr-2 mb-4">
      <div className="flex-grow">
        <h3 className="text-left text-sm font-semibold text-gray-900">Någonting gick fel</h3>
        <p className="text-left text-xs text-gray-900">Kunde inte hämta alla avgångar, försök igen senare.</p>
      </div>

      <button onClick={() => router.refresh()}>
        <ArrowsRound width={20} height={20} className="rotate-90" />
      </button>
    </div>
  )
}
