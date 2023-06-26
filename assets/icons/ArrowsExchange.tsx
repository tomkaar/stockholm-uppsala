import React, { SVGProps } from "react"

export const ArrowsExchange = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={3}
      {...props}
    >
      <path d="M31 55L31 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M36.818 55H25.182C24.0078 55 23.4197 56.4197 24.25 57.25L28.8787 61.8787C30.0503 63.0503 31.9498 63.0503 33.1213 61.8787L37.75 57.25C38.5803 56.4197 37.9923 55 36.818 55Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M49 25L49 64" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M54.818 24.9995H43.182C42.0078 24.9995 41.4197 23.5799 42.25 22.7495L46.8787 18.1209C48.0503 16.9493 49.9498 16.9493 51.1213 18.1209L55.75 22.7495C56.5803 23.5799 55.9923 24.9995 54.818 24.9995Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
