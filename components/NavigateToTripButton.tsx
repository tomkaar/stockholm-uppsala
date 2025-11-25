"use client"

import dayjs from "dayjs"

import { LinkButton } from "./LinkButton"
import { Chevron } from "@/assets/icons/Chevron"

type Props = {
  from: string
  to: string
}

export default function NavigateToTripButton({ from, to }: Props) {
  const today = dayjs().format("YYYY-MM-DD")

  return (
    <LinkButton prefetch={false} href={`/${from}/${to}/${today}`}>
      <span className="font-semibold">{from}</span>
      &nbsp;
      <Chevron width={16} height={16} className="rotate-90" />
      &nbsp;
      <span className="font-semibold">{to}</span>
    </LinkButton>
  )
}
