import { Suspense } from "react"

export const Loading = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Fallback />}>
    {children}
  </Suspense>
)

export const Fallback = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800 border-b border-b-slate-200 dark:border-b-slate-900" />
      <div className="w-full h-[60px] bg-slate-50 dark:bg-slate-800" />
    </div>
  )
}
