import { stationStockholm, stationUppsala } from "@/constants/stations";
import { DistruptionMessages } from "../../../_components/DistruptionMessages/DistruptionMessages";
import { Navigation } from "../../../_components/Navigation";
import { notFound } from "next/navigation";

export interface ILayout {
  children: React.ReactNode;
  params: {
    from: string;
    to: string;
    day: string;
  };
}

const Layout = ({ children, params }: ILayout) => {
  const isValidFromDate = [stationStockholm, stationUppsala].includes(params.from)
  const isValidToDate = [stationStockholm, stationUppsala].includes(params.to)

  if (!isValidFromDate || !isValidToDate) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <DistruptionMessages from={params.from} day={params.day} />
      {children}
    </>
  )
}

export default Layout;
