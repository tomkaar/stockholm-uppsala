export interface GetDistruptionMessagesQuery {
  station: string
}

export function getDistruptionMessagesQuery({ station }: GetDistruptionMessagesQuery) {
  return `
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
  `
}
