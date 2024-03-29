import Link from "next/link"
import { HTMLProps } from "react"

export interface ILinkButton extends HTMLProps<HTMLAnchorElement> {
  href: string
  prefetch?: boolean
}

export const LinkButton = ({ children, href, prefetch = true }: ILinkButton) => (
  <Link
    href={href}
    prefetch={prefetch}
    className="relative bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white h-12 min-h-[48px] px-8 rounded-lg flex items-center pointer-events-auto"
  >
    {children}
  </Link>
)
