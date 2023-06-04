export enum Station {
  UPPSALA = "Uppsala",
  STOCKHOLM = "Stockholm",
}

const trainStation = {
  Uppsala: "U",
  Stockholm: "Cst",
};

const pendeltågStation = {
  Uppsala: "U",
  Stockholm: "Sci",
};

/**
 * Get the station names for the specific station.
 * The names differ between commuter trains and regular trains
 */
export default function getStationName(
  station?: Station | "Uppsala" | "Stockholm" | string
) {
  if (!station) return null;
  return {
    pendeltåg:
      station === "Uppsala"
        ? pendeltågStation.Uppsala
        : pendeltågStation.Stockholm,
    tåg: station === "Uppsala" ? trainStation.Uppsala : trainStation.Stockholm,
  };
}
