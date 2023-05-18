export default function Loading() {
  return (
    <div className="animate-pulse flex flex-row justify-center">
      <div className="flex flex-col gap-2 max-w-md w-full my-6 mx-4">
        <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800 rounded-lg" />
        <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800 rounded-lg" />
        <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800 rounded-lg" />
      </div>
    </div>
  )
}
