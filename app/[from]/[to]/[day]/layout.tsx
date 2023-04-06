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

const Layout = ({ children, params, ...props }: ILayout) => {
  const isValidFromStation = [stationStockholm, stationUppsala].includes(params.from)
  const isValidToStation = [stationStockholm, stationUppsala].includes(params.to)

  if (!isValidFromStation || !isValidToStation) {
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
