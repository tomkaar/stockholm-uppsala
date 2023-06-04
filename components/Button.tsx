import { HTMLProps } from "react"

export interface IButton extends HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset" | undefined
}

export const Button = ({ children, className, ...props }: IButton) => (
  <button
    className={`
      relative bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white h-12 min-h-[48px] px-8 rounded-lg flex items-center pointer-events-auto
      ${className ?? ""}
    `}
    {...props}
  >
    {children}
  </button>
)
