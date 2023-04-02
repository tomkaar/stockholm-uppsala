import { TrainAnnouncementResponse } from '@/types/Response'
import { TrainAnnouncement } from '@/types/TrainAnnouncement'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = TrainAnnouncement[]

const stationStockholm = "Cst"
const stationUppsala = "U"

const trainCodeMalartag = "PNA014"
const trainCodeSJRegional = "PNA025"

const infomationCodeMovingoAvailable = "ONA180"

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const stationFrom = Array.isArray(req.query.from) ? req.query.from[0]: req.query.from ?? stationStockholm
  const stationTo = Array.isArray(req.query.to) ? req.query.to[0] : req.query.to ?? stationUppsala

  const dateFrom = dayjs(Array.isArray(req.query.day) ?  req.query.day[0] : req.query.day ?? new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .format("DD MMM YYYY HH:mm:ss")

  const dateTo = dayjs(Array.isArray(req.query.day) ?  req.query.day[0] : req.query.day ?? new Date())
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .format("DD MMM YYYY HH:mm:ss")
  
  const response = await fetch("https://api.trafikinfo.trafikverket.se/v2/data.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/xml",
      Accept: "application/json",
    },
    body: `
      <REQUEST>
        <LOGIN authenticationkey='${process.env.AUTH_KEY}' />
          <QUERY objecttype='TrainAnnouncement' schemaversion='1.8'>
            <FILTER>
              <AND>
                <EQ name='LocationSignature' value='${stationFrom}' />
                <EQ name='ActivityType' value='Avgang' />

                <OR>
                  <EQ name='ToLocation.LocationName' value='${stationTo}' />
                  <EQ name='ViaToLocation.LocationName' value='${stationTo}' />
                </OR>

                <AND>
                  <GT name='AdvertisedTimeAtLocation' value='${dateFrom}'/>
                  <LT name='AdvertisedTimeAtLocation' value='${dateTo}'/>
                </AND>
              </AND>
            </FILTER>

            <INCLUDE>ActivityId</INCLUDE>
            <INCLUDE>LocationSignature</INCLUDE>
            <INCLUDE>FromLocation</INCLUDE>
            <INCLUDE>ViaFromLocation</INCLUDE>
            <INCLUDE>ToLocation</INCLUDE>
            <INCLUDE>ViaToLocation</INCLUDE>
            <INCLUDE>TimeAtLocation</INCLUDE>
            <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
            <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
            <INCLUDE>AdvertisedTrainIdent</INCLUDE>
            <INCLUDE>OperationalTrainNumber</INCLUDE>
            <INCLUDE>ProductInformation</INCLUDE>
            <INCLUDE>Canceled</INCLUDE>
            <INCLUDE>ModifiedTime</INCLUDE>
            <INCLUDE>Advertised</INCLUDE>
            <INCLUDE>EstimatedTimeIsPreliminary</INCLUDE>
            <INCLUDE>TrackAtLocation</INCLUDE>
            <INCLUDE>Deviation</INCLUDE>
            <INCLUDE>OtherInformation</INCLUDE>
            <INCLUDE>Booking</INCLUDE>
            <INCLUDE>Service</INCLUDE>
            <INCLUDE>TrainComposition</INCLUDE>
        </QUERY>
      </REQUEST>
    `,
  })
  console.log("response", response)

  const result = await response.json() as TrainAnnouncementResponse
  // console.log("result", JSON.stringify(result, null, 2))

  const TrainAnnouncements = result.RESPONSE.RESULT[0].TrainAnnouncement ?? []

  // filter valid trains
  const filteredAnnouncements = TrainAnnouncements
    ?.filter(announcement => 
      // Mälartåg
      announcement?.ProductInformation?.some(info => [trainCodeMalartag].includes(info.Code ?? "")) ||
      // SJ Regional with "Movingo Gäller"
      announcement?.ProductInformation?.some(info => [trainCodeSJRegional].includes(info?.Code ?? "")) && 
      announcement?.OtherInformation?.some(info => [infomationCodeMovingoAvailable].includes(info?.Code ?? ""))
    )

  res.status(200).json(filteredAnnouncements)
  // res.status(200).json({ result: TrainAnnouncements, filteredAnnouncements })
}

export default handler
