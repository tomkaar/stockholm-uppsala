import "server-only"

import { stationStockholm, stationUppsala } from "@/constants/stations";
import dayjs from "dayjs";
import { TrainAnnouncementResponse } from "@/types/Response";
import { codeMovingoNoValid, codeOnlySJTicket } from "@/constants/codes";

export const getTrains = async (fromStation: string = stationStockholm, toStation: string = stationUppsala, selectedDay: string) => {
  const dateFrom = dayjs(selectedDay ?? new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .format("DD MMM YYYY HH:mm:ss")

  const dateTo = dayjs(selectedDay ?? new Date())
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
    next: {
      revalidate: 10,
    },
    body: `
      <REQUEST>
        <LOGIN authenticationkey='${process.env.AUTH_KEY}' />
          <QUERY objecttype='TrainAnnouncement' schemaversion='1.8'>
            <FILTER>
              <AND>
                <EQ name='LocationSignature' value='${fromStation}' />
                <EQ name='ActivityType' value='Avgang' />

                <OR>
                  <EQ name='ToLocation.LocationName' value='${toStation}' />
                  <EQ name='ViaToLocation.LocationName' value='${toStation}' />
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
            <INCLUDE>ScheduledDepartureDateTime</INCLUDE>
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
  .then(res => res.json())
  .catch((err) => console.error("err --->", err))

  const result = response as TrainAnnouncementResponse

  const TrainAnnouncements = result.RESPONSE.RESULT[0].TrainAnnouncement ?? []

  // filter valid trains
  const filteredAnnouncements = TrainAnnouncements
    ?.filter(announcement => 
      // remove when message "Movingo gäller ej."
      !announcement?.OtherInformation?.some(info => info.Code === codeMovingoNoValid) &&
      // remove when message "Endast SJ-biljetter gäller."
      !announcement?.OtherInformation?.some(info => info.Code === codeOnlySJTicket)
    )

  return { trains: filteredAnnouncements, date: new Date() }
};
