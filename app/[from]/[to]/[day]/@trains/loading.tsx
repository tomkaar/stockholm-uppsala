export default function Loading() {
  return (
    <div className="animate-pulse flex flex-row justify-center px-4">
      <div className="flex flex-col justify-center max-w-md w-full">
        <div className="flex flex-col w-full mt-2">
          <div className="self-end w-[100px] h-4 text-base bg-slate-50 dark:bg-slate-800 rounded-lg" />
          <div className="self-center mb-4 w-[150px] h-6 text-base bg-slate-50 dark:bg-slate-800 rounded-lg" />
        </div>

        <div className="flex flex-col gap-2 w-full mb-6">
          <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800 rounded-lg" />
          <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800 rounded-lg" />
          <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
