import dayjs from 'dayjs'
import { TrainAnnouncementResponse } from '@/types/Response'
import { stationStockholm, stationUppsala } from '@/constants/stations'
import { codeMovingoNoValid, codeOnlySJTicket } from '@/constants/codes'

export interface IhandleFetchContent {
  from?: string
  to?: string
  day?: string
}

export const handleFetchTrainAnnouncements = async ({ from, to, day }: IhandleFetchContent) => {
  const stationFrom = from ?? stationStockholm
  const stationTo = to ?? stationUppsala

  const dateFrom = dayjs(day ?? new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .format("DD MMM YYYY HH:mm:ss")

  const dateTo = dayjs(day ?? new Date())
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
  const result = await response.json() as TrainAnnouncementResponse

  const TrainAnnouncements = result.RESPONSE.RESULT[0].TrainAnnouncement ?? []

  // filter valid trains
  const filteredAnnouncements = TrainAnnouncements
    ?.filter(announcement => 
      // remove when message "Movingo gäller ej."
      !announcement?.OtherInformation?.some(info => info.Code === codeMovingoNoValid) &&
      // remove when message "Endast SJ-biljetter gäller."
      !announcement?.OtherInformation?.some(info => info.Code === codeOnlySJTicket)
    )

  return filteredAnnouncements
}
