export default function Loading() {
  return (
    <div className="animate-pulse w-full">
      <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800 border-b border-b-slate-100 dark:border-b-slate-900" />
      <div className="w-full h-[40px] bg-slate-50 dark:bg-slate-800 border-b border-b-slate-100 dark:border-b-slate-900" />
      <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800" />
    </div>
  )
}
