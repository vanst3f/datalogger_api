import type { Label, Reading, Summary } from "./types.js";

import { calculateExcursions } from "./calculateExcursions.js";

export function calculateSummary(readings: Reading[], label: Label): Summary {
  const minTemp = Math.min(...readings.map((reading) => reading.temperatureC));
  const maxTemp = Math.max(...readings.map((reading) => reading.temperatureC));
  const avgTemp =
    [...readings].reduce((total, reading) => total + reading.temperatureC, 0) /
    readings.length;
  const totalMinutes = calculateExcursions(readings, label).reduce(
    (total, excursion) => total + excursion.durationMinutes,
    0,
  );

  const summary: Summary = {
    minC: minTemp,
    maxC: maxTemp,
    averageC: avgTemp,
    totalExcursionMinutes: totalMinutes,
    status: totalMinutes <= label.toleranceMinutes ? "approved" : "rejected",
  };

  return summary;
}
