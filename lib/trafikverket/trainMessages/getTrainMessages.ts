import { stationStockholm } from "@/constants/stations";
import { TrainMessageResponse } from "@/types/Response";
import { fetchFromTrafikverket } from "../fetchFromTrafikverket";
import { getTrainMessagesQuery } from "./query";

export const getTrainMessages = async (station: string = stationStockholm) => {
  const response = await fetchFromTrafikverket(
    getTrainMessagesQuery({ station })
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta meddelanden");
  }

  const result: TrainMessageResponse = await response.json();

  return result?.RESPONSE?.RESULT?.[0]?.TrainMessage ?? [];
};
