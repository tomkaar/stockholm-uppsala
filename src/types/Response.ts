import { TrainAnnouncement } from "./TrainAnnouncement"
import { TrainMessage } from "./TrainMessage"

export interface TrainAnnouncementResponse {
  RESPONSE: {
    RESULT: {
      _attr_id?: string
      TrainAnnouncement?: TrainAnnouncement[]
      INFO?: {
        LASTMODIFIED?: {
          _attr_datetime?: string
        }
        LASTCHANGEID?: string
        EVALRESULT?: unknown[]
        SSEURL?: string
      }
      ERROR?: {
        SOURCE?: string
        MESSAGE?: string
      }
    }[]
  }
}

export interface TrainMessageResponse {
  RESPONSE: {
    RESULT: {
      _attr_id?: string
      TrainMessage?: TrainMessage[]
      INFO?: {
        LASTMODIFIED?: {
          _attr_datetime?: string
        }
        LASTCHANGEID?: string
        EVALRESULT?: unknown[]
        SSEURL?: string
      }
      ERROR?: {
        SOURCE?: string
        MESSAGE?: string
      }
    }[]
  }
}
