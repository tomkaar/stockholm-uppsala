"use client"

import { Refresh } from "@/assets/icons/Refresh";
import { useRouter } from "next/navigation";

export function PartialFetchError() {
  const router = useRouter()

  return (
    <div className="flex items-center bg-rose-500 dark:bg-orange-600 rounded-lg py-2 px-4 mb-4">
      <div className="flex-grow">
        <h3 className="text-left text-md font-semibold text-gray-900">Någonting gick fel</h3>
        <p className="text-left text-sm text-gray-900">Kunde inte hämta alla avgångar, försök igen senare.</p>
      </div>

      <button onClick={() => router.refresh()}>
        <Refresh width={20} height={20} />
      </button>
    </div>
  )
}