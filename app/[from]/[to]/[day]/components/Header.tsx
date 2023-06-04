"use client"

import { usePathname } from "next/navigation"

import { stationStockholm, stationUppsala } from "@/constants/stations"

import { FAQ } from "./FAQ"

export const Header = () => {
  const pathname = usePathname()

  const [_, from, to] = (pathname ?? "")?.split("/")

  const fromStation = from ?? stationStockholm
  const toStation = to ?? stationUppsala

  const fromStationName = fromStation === "U" ? "Uppsala" : "Stockholm"
  const toStationName = toStation === "Cst" ? "Stockholm" : "Uppsala"

  return (
    <header className="sticky top-0 z-20 flex flex-row justify-center items-center py-4 px-4 bg-white dark:bg-slate-900 border-b border-slate-900/10 dark:border-slate-700">
      <h1 className="text-slate-900 dark:text-white text-xl tracking-light text-center font-bold">
        {fromStationName}
        &nbsp;&nbsp;
        <span className="inline-block scale-x-[-1]">🚂</span>
        &nbsp;&nbsp;
        {toStationName}
      </h1>

      <FAQ />
    </header>
  )
}
