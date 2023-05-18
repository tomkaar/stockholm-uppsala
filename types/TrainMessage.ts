export type WKT_SWEREF99TM = string
export type WKT_WGS84 = string

export interface TrainMessage {
  CountyNo?: number[]
  Deleted?: boolean
  ExternalDescription?: string
  Geometry?: Geometry
  EventId?: string
  Header?: string
  ReasonCode?: {
    Code?: string
    Description?: string
  }[]
  TrafficImpact?: {
    IsConfirmed?: boolean
    FromLocation?: string[]
    AffectedLocation?: {
      LocationSignature?: string
      ShouldBeTrafficInformed?: boolean
    }[]
    ToLocation?: string[]
  }[]
  StartDateTime?: string
  PrognosticatedEndDateTimeTrafficImpact?: string
  EndDateTime?: string
  LastUpdateDateTime?: string
  ModifiedTime?: string
}

export interface Geometry {
  SWEREF99TM?: WKT_SWEREF99TM
  WGS84?: WKT_WGS84
}
