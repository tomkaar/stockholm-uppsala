import {
  codeMovingoNoValid,
  codeOnlySJTicket,
  SJInterCity,
} from "@/constants/codes";
import { TrainAnnouncement } from "@/types/TrainAnnouncement";

export function filterTrains(trains: TrainAnnouncement[]) {
  return trains?.filter(
    (announcement) =>
      // remove when message "Movingo gäller ej."
      !announcement?.OtherInformation?.some(
        (info) => info.Code === codeMovingoNoValid
      ) &&
      // remove when message "Endast SJ-biljetter gäller."
      !announcement?.OtherInformation?.some(
        (info) => info.Code === codeOnlySJTicket
      ) &&
      // remove SJ Intercity tickets
      !announcement?.ProductInformation?.some(
        (info) => info.Code === SJInterCity
      )
  );
}
