import { Arrow } from "@/assets/icons/Arrow"

export const Loading = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="text-base text-slate-900 font-semibold dark:text-slate-300">Tidtabell</div>
        <span className="text-sm text-right text-slate-500 dark:text-slate-400">Hämtar tidtabell</span>
      </div>

      <Station />
      <Station />
      <Station />
      <Station isLast />
    </>
  )
}

const Station = ({ isLast = false }: { isLast?: boolean }) => (
  <div className="relative flex flex-row gap-4 animate-pulse">
    <div className="mt-[6px] w-2 h-2 rounded-full shrink-0 bg-slate-200 dark:bg-slate-700" />
    {!isLast && <div className="absolute top-6 left-[3px] w-[1px] h-[75%] bg-slate-200 dark:bg-slate-700" />}

    <div className="w-full">
      <div className="flex flex-row justify-between">
        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />

        <p className={`mt-1 flex items-end gap-2`}>
          <span className="block pt-1 pb-1">
            <span className="block pt-1 pb-1 w-12 h-4 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          </span>
        </p>
      </div>

      <div className="flex gap-2">
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <Arrow width={16} height={16} className="rotate-90 text-slate-500 dark:text-slate-600 mb-0.5" />
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>
    </div>
  </div>
)
