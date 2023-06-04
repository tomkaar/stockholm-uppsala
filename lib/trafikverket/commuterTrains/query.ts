export interface IgetTrainsQuery {
  dateFrom: string
  dateTo: string
  fromStation: string
  toStation: string
  trains: string[]
}

export function getAdvertisedTrainIdentQuery(toStation: string) {
  return `
    <QUERY objecttype="TrainAnnouncement" schemaversion="1.8"> 
      <FILTER> 
        <AND>
          <EQ name="ActivityType" value="Ankomst" />
          <EQ name="LocationSignature" value="${toStation}" /> 
          <EQ name="TypeOfTraffic.Description" value="Pendeltåg" />
        </AND>
      </FILTER> 
      <DISTINCT>AdvertisedTrainIdent</DISTINCT>
    </QUERY>
  `
}

export function getPendeltagQuery({ dateFrom, dateTo, fromStation, toStation, trains = [] }: IgetTrainsQuery) {
  return `
    <QUERY objecttype="TrainAnnouncement" schemaversion="1.8" orderby="AdvertisedTimeAtLocation">
      <FILTER> 
        <AND>
          <AND>
              <GT name='AdvertisedTimeAtLocation' value='${dateFrom}'/>
              <LT name='AdvertisedTimeAtLocation' value='${dateTo}'/>
          </AND>
          
          <IN name="AdvertisedTrainIdent" value="${trains.join(",")}" /> 
          
          <OR>
            <AND>
              <EQ name="ActivityType" value="Avgang" />
              <EQ name="LocationSignature" value="${fromStation}" />
              <EQ name="TypeOfTraffic.Description" value="Pendeltåg" />
            </AND>
            <AND>
              <EQ name="ActivityType" value="Ankomst" />
              <EQ name="LocationSignature" value="${toStation}" />
              <EQ name="TypeOfTraffic.Description" value="Pendeltåg" />
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
        <INCLUDE>TypeOfTraffic</INCLUDE>
  </QUERY>
  `
}
