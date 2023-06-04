export interface TrainAnnouncement {
  ActivityId?: string
  ActivityType?: string
  Advertised?: boolean
  AdvertisedTimeAtLocation?: string
  AdvertisedTrainIdent?: string
  Booking?: {
    Code?: string
    Description?: string
  }[]
  Canceled?: boolean
  Deleted?: boolean
  DepartureDateOTN?: string
  Deviation?: {
    Code?: string
    Description?: string
  }[]
  EstimatedTimeAtLocation?: string
  EstimatedTimeIsPreliminary?: boolean
  FromLocation?: {
    LocationName?: string
    Priority?: number
    Order?: number
  }[]
  InformationOwner?: string
  LocationDateTimeOTN?: string
  LocationSignature?: string
  MobileWebLink?: string
  ModifiedTime?: string
  NewEquipment?: number
  Operator?: string
  OperationalTrainNumber?: string
  OtherInformation?: {
    Code?: string
    Description?: string
  }[]
  PlannedEstimatedTimeAtLocation?: string
  PlannedEstimatedTimeAtLocationIsValid?: boolean
  ProductInformation?: {
    Code?: string
    Description?: string
  }[]
  ScheduledDepartureDateTime?: string
  Service?: {
    Code?: string
    Description?: string
  }[]
  TimeAtLocation?: string
  TimeAtLocationWithSeconds?: string
  ToLocation?: {
    LocationName?: string
    Priority?: number
    Order?: number
  }[]
  TrackAtLocation?: string
  TrainComposition?: {
    Code?: string
    Description?: string
  }[]
  TrainOwner?: string
  TypeOfTraffic?: {
    Code?: string
    Description?: string
  }[]
  ViaFromLocation?: {
    LocationName?: string
    Priority?: number
    Order?: number
  }[]
  ViaToLocation?: {
    LocationName?: string
    Priority?: number
    Order?: number
  }[]
  WebLink?: string
  WebLinkName?: string
}
