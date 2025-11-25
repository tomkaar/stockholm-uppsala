export interface GetDistruptionMessagesQuery {
  operationalTrainNumber: string
  scheduledDepartureDateTime: string
}

export function getTrainAnnouncementQuery({
  operationalTrainNumber,
  scheduledDepartureDateTime,
}: GetDistruptionMessagesQuery) {
  return `
    <QUERY objecttype='TrainAnnouncement' orderby='AdvertisedTimeAtLocation' schemaversion='1.8'>
      <FILTER>
        <AND>
          <EQ name="Advertised" value="true" />
          <EQ name="OperationalTrainNumber" value="${operationalTrainNumber}" />
          <EQ name="ScheduledDepartureDateTime" value="${scheduledDepartureDateTime}" />
        </AND>
      </FILTER>

      <INCLUDE>ActivityId</INCLUDE>
      <INCLUDE>ActivityType</INCLUDE>
      <INCLUDE>LocationSignature</INCLUDE>
      <INCLUDE>ScheduledDepartureDateTime</INCLUDE>
      <INCLUDE>TimeAtLocation</INCLUDE>
      <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
      <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
      <INCLUDE>AdvertisedTrainIdent</INCLUDE>
      <INCLUDE>OperationalTrainNumber</INCLUDE>
      <INCLUDE>Canceled</INCLUDE>
      <INCLUDE>EstimatedTimeIsPreliminary</INCLUDE>
      <INCLUDE>TrackAtLocation</INCLUDE>
  </QUERY>
  `
}
