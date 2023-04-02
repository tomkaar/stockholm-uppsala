import { TrainAnnouncementResponse, TrainMessageResponse } from '@/types/Response'
import { TrainAnnouncement } from '@/types/TrainAnnouncement'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = TrainAnnouncement[]

const stationStockholm = "Cst"
const stationUppsala = "U"

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const station = Array.isArray(req.query.station) ? req.query.station[0]: req.query.station ?? stationStockholm

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
              <EQ name="TrafficImpact.AffectedLocation.LocationSignature" value="${station}" />
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
  console.log("response", response)

  const result = await response.json() as TrainMessageResponse
  console.log(JSON.stringify(result, null, 2))

  const TrainMessage = result.RESPONSE.RESULT[0].TrainMessage ?? []

  res.status(200).json(TrainMessage)
}

export default handler
