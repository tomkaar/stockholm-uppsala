"use client"

export default function Error() {
  return (
    <div className="w-full">
      <div className="w-full px-4 py-4 text-center bg-orange-500 dark:bg-orange-500 border-b border-b-slate-200 dark:border-b-slate-900">
        <p className="text-sm text-slate-200 dark:text-slate-200">Kunde inte hämta trafik meddelanden</p>
      </div>
    </div>
  )
}
