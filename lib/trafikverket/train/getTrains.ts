import { stationStockholm, stationUppsala } from "@/constants/stations";
import dayjs from "dayjs";
import { getTrainsQuery } from "./query";
import { fetchFromTrafikverket } from "../fetchFromTrafikverket";
import { TrainAnnouncement } from "@/types/TrainAnnouncement";

export const getTrains = async (
  fromStation: string = stationStockholm,
  toStation: string = stationUppsala,
  selectedDay: string
) => {
  const dateFrom = dayjs(selectedDay ?? new Date())
    .hour(0)
    .minute(0)
    .second(0)
    .format("DD MMM YYYY HH:mm:ss");

  const dateTo = dayjs(selectedDay ?? new Date())
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .format("DD MMM YYYY HH:mm:ss");

  const response = await fetchFromTrafikverket(
    getTrainsQuery({ dateFrom, dateTo, fromStation, toStation })
  )
    .then((res) => res.json())
    .then((data) => data.RESPONSE.RESULT[0].TrainAnnouncement ?? [])
    .then((data) => ({ data, date: new Date(), error: false }))
    .catch(() => ({ data: [], date: new Date(), error: true }));

  const { data, date, error } = response as {
    data: TrainAnnouncement[];
    date: Date;
    error: boolean;
  };

  return { trains: data, date, error };
};
