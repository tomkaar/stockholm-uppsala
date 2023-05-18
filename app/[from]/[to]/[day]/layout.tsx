import { stationStockholm, stationUppsala } from "@/constants/stations";
import ErrorBoundary from "@/components/ErrorBoundary";
import { TrainInformationRouteParams } from "@/types/TrainInformationRouteParams";
import { Navigation } from "./components/Navigation";

import { notFound } from "next/navigation";
import { Suspense } from "react";

import DistruptionMessagesError from "./@distruptionMessages/error";
import DistruptionMessagesLoading from "./@distruptionMessages/loading";
import TrainsError from "./@trains/error";
import TrainsLoading from "./@trains/loading";
import dayjs from "dayjs";


export interface ILayout {
  children: React.ReactNode;
  distruptionMessages: React.ReactNode;
  trains: React.ReactNode;
  params: TrainInformationRouteParams;
}

export default async function Layout({ children, distruptionMessages, trains, params }: ILayout) {
  const isValidFromStation = [stationStockholm, stationUppsala].includes(params.from)
  const isValidToStation = [stationStockholm, stationUppsala].includes(params.to)
  const dayIsBeforeToday = dayjs(params.day).isBefore(dayjs(), "day")

  if (!isValidFromStation || !isValidToStation || dayIsBeforeToday) {
    notFound()
  }

  return (
    <>
      <Navigation />

      <ErrorBoundary fallback={<DistruptionMessagesError />}>
        <Suspense fallback={<DistruptionMessagesLoading />}>
          {distruptionMessages}
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<TrainsError />}>
        <Suspense fallback={<TrainsLoading />}>
          {trains}
        </Suspense>
      </ErrorBoundary>

      {children}
    </>
  )
}
