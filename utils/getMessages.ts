import { stationStockholm } from "@/constants/stations"
import { TrainMessageResponse } from "@/types/Response"

export const getMessages = async (station: string = stationStockholm) => {
  const response = await fetch("https://api.trafikinfo.trafikverket.se/v2/data.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
      Accept: "application/json",
    },
    next: {
      revalidate: 10,
    },
    body: `
      <REQUEST>
        <LOGIN authenticationkey='${process.env.AUTH_KEY}' />
          <QUERY objecttype='TrainMessage' schemaversion='1.7'>
            <FILTER>
              <EQ name="TrafficImpact.AffectedLocation.LocationSignature" value="${station}" />
            </FILTER>

            <INCLUDE>EventId</INCLUDE>
            <INCLUDE>ExternalDescription</INCLUDE>
            <INCLUDE>LastUpdateDateTime</INCLUDE>
            <INCLUDE>ModifiedTime</INCLUDE>
            <INCLUDE>Header</INCLUDE>
            <INCLUDE>EndDateTime</INCLUDE>
            <INCLUDE>StartDateTime</INCLUDE>
            <INCLUDE>PrognosticatedEndDateTimeTrafficImpact</INCLUDE>
            <INCLUDE>ReasonCodeText</INCLUDE>
            <INCLUDE>TrafficImpact</INCLUDE>
        </QUERY>
      </REQUEST>
    `,
  })

  if (!response.ok) {
    throw new Error("Kunde inte hämta meddelanden")
  }

  const result = await response.json() as TrainMessageResponse

  const TrainMessages = result?.RESPONSE?.RESULT?.[0]?.TrainMessage ?? []

  return TrainMessages
}
