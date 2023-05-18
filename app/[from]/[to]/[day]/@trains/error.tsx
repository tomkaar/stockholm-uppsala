"use client"

export default function Error() {
  return (
    <div className="w-full flex flex-row justify-center pt-8">
      <div className="w-full max-w-lg px-4 py-4 text-center bg-slate-50 dark:bg-slate-800  rounded-lg">
        <p className="text-sm text-slate-500 dark:text-slate-200">
          Kunde inte hämta avgångar
        </p>
      </div>
    </div>
  )
}
