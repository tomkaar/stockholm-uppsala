import { TrainMessageResponse } from "@/types/Response"

const stationStockholm = "Cst"

export interface IhandleFetchMessages {
  station?: string
}

export const handleFetchMessages = async ({ station }: IhandleFetchMessages) => {
  const _station = station ?? stationStockholm

  const response = await fetch("https://api.trafikinfo.trafikverket.se/v2/data.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
      Accept: "application/json",
    },
    body: `
      <REQUEST>
        <LOGIN authenticationkey='${process.env.AUTH_KEY}' />
          <QUERY objecttype='TrainMessage' schemaversion='1.7'>
            <FILTER>
              <EQ name="TrafficImpact.AffectedLocation.LocationSignature" value="${_station}" />
            </FILTER>

            <INCLUDE>EventId</INCLUDE>
            <INCLUDE>ExternalDescription</INCLUDE>
            <INCLUDE>LastUpdateDateTime</INCLUDE>
            <INCLUDE>ModifiedTime</INCLUDE>
            <INCLUDE>Header</INCLUDE>
            <INCLUDE>EndDateTime</INCLUDE>
            <INCLUDE>StartDateTime</INCLUDE>
            <INCLUDE>ReasonCodeText</INCLUDE>
            <INCLUDE>TrafficImpact</INCLUDE>
        </QUERY>
      </REQUEST>
    `,
  })
  const result = await response.json() as TrainMessageResponse

  const TrainMessage = result.RESPONSE.RESULT[0].TrainMessage ?? []

  return TrainMessage
}