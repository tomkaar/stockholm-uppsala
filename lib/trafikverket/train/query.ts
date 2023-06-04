export interface IgetTrainsQuery {
  dateFrom: string;
  dateTo: string;
  fromStation: string;
  toStation: string;
}

export const getTrainsQuery = ({
  dateFrom,
  dateTo,
  fromStation,
  toStation,
}: IgetTrainsQuery) => {
  return `
    <QUERY objecttype='TrainAnnouncement' schemaversion='1.8'>
      <FILTER>
        <AND>
          <AND>
              <GT name='AdvertisedTimeAtLocation' value='${dateFrom}'/>
              <LT name='AdvertisedTimeAtLocation' value='${dateTo}'/>
          </AND>
          <OR>
              <AND>
                  <EQ name='LocationSignature' value='${fromStation}' />
                  <EQ name='ActivityType' value='Avgang' />
                  <OR>
                      <EQ name='ToLocation.LocationName' value='${toStation}' />
                      <EQ name='ViaToLocation.LocationName' value='${toStation}' />
                  </OR>
              </AND>
              <AND>
                  <EQ name='LocationSignature' value='${toStation}' />
                  <EQ name='ActivityType' value='Ankomst' />
                  <OR>
                      <EQ name='FromLocation.LocationName' value='${fromStation}' />
                      <EQ name='ViaFromLocation.LocationName' value='${fromStation}' />
                  </OR>
              </AND>
          </OR>
        </AND>
      </FILTER>

      <INCLUDE>ActivityId</INCLUDE>
      <INCLUDE>ActivityType</INCLUDE>
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
  `;
};
