import React, { SVGProps } from "react"

export interface IHelpCircle {
  width?: number
  height?: number
}

export const HelpCircle = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M68 40C68 55.464 55.464 68 40 68C24.536 68 12 55.464 12 40C12 24.536 24.536 12 40 12C55.464 12 68 24.536 68 40Z"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 46.3611V45.9808C40 43.1512 41.4911 41.3699 43.9237 39.9246L44.9751 39.3C47.4705 37.8175 49 35.1297 49 32.2271C49 27.6834 45.3166 24 40.7729 24H40C35.0294 24 31 28.0294 31 33V33.5082"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M40 53.6001V55.2001" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
