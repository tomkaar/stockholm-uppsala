import React, { SVGProps } from "react"

export const Arrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
      <path
        d="M40.0388 13.1699L40.0427 38.963M40.0427 39.0001L40.0427 67.0001"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={5}
      />
      <path
        d="M12 39.0002L36.2877 14.7125C38.3379 12.6622 41.6621 12.6622 43.7123 14.7125L68 39.0002"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={5}
      />
    </svg>
  )
}
