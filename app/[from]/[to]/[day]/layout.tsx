import { notFound } from "next/navigation"
import { Suspense } from "react"

import { TrainInformationRouteParams } from "@/types/TrainInformationRouteParams"

import { Header } from "./components/Header"
import { Navigation } from "./components/Navigation"

export interface ILayout {
  children: React.ReactNode
  distruptionMessages: React.ReactNode
  trains: React.ReactNode
  params: Promise<TrainInformationRouteParams>
}

export default async function Layout({ children, distruptionMessages, trains, params }: ILayout) {
  const resolvedParams = await params
  const isValidFromStation = ["Uppsala", "Stockholm"].includes(resolvedParams.from)
  const isValidToStation = ["Uppsala", "Stockholm"].includes(resolvedParams.to)

  if (!isValidFromStation || !isValidToStation) {
    notFound()
  }

  return (
    <>
      <Header from={resolvedParams.from} to={resolvedParams.to} />
      <Navigation />

      {distruptionMessages}
      {trains}
      {children}
    </>
  )
}
