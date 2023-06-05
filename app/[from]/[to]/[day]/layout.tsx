import dayjs from "dayjs"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import ErrorBoundary from "@/components/ErrorBoundary"
import { TrainInformationRouteParams } from "@/types/TrainInformationRouteParams"

import DistruptionMessagesError from "./@distruptionMessages/error"
import DistruptionMessagesLoading from "./@distruptionMessages/loading"
import TrainsError from "./@trains/error"
import TrainsLoading from "./@trains/loading"
import { Header } from "./components/Header"
import { Navigation } from "./components/Navigation"

export interface ILayout {
  children: React.ReactNode
  distruptionMessages: React.ReactNode
  trains: React.ReactNode
  params: TrainInformationRouteParams
}

export default async function Layout({ children, distruptionMessages, trains, params }: ILayout) {
  const isValidFromStation = ["Uppsala", "Stockholm"].includes(params.from)
  const isValidToStation = ["Uppsala", "Stockholm"].includes(params.to)
  const dayIsBeforeToday = await new Promise<boolean>((res) => res(dayjs(params.day).isBefore(dayjs(), "day")))

  if (!isValidFromStation || !isValidToStation || dayIsBeforeToday) {
    notFound()
  }

  return (
    <>
      <Header from={params.from} to={params.to} />
      <Navigation />

      <ErrorBoundary fallback={<DistruptionMessagesError />}>
        <Suspense fallback={<DistruptionMessagesLoading />}>{distruptionMessages}</Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<TrainsError />}>
        <Suspense fallback={<TrainsLoading />}>{trains}</Suspense>
      </ErrorBoundary>

      {children}
    </>
  )
}
