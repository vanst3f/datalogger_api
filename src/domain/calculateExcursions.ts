import type { Label, Reading, Excursion } from "./types.js";

export function calculateExcursions(
  readings: Reading[],
  label: Pick<Label, "minC" | "maxC">,
): Excursion[] {
  const result: Excursion[] = [];
  let currentExcursion: Excursion | null = null;

  const sortedReadings: Reading[] = [...readings].sort(
    (a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp),
  );

  for (const reading of sortedReadings) {
    const isOutOfRange =
      reading.temperatureC < label.minC || reading.temperatureC > label.maxC;

    if (isOutOfRange && !currentExcursion) {
      currentExcursion = {
        start: reading.timestamp,
        end: "",
        durationMinutes: 0,
        peakC: reading.temperatureC,
      };
    }

    if (isOutOfRange && currentExcursion) {
      currentExcursion.peakC =
        Math.abs(reading.temperatureC) > Math.abs(currentExcursion.peakC)
          ? reading.temperatureC
          : currentExcursion.peakC;
    }

    if (!isOutOfRange && currentExcursion) {
      currentExcursion.end = reading.timestamp;
      currentExcursion.durationMinutes =
        Math.abs(
          Date.parse(currentExcursion.start) - Date.parse(currentExcursion.end),
        ) /
        (1000 * 60);
      currentExcursion.peakC =
        Math.abs(reading.temperatureC) > Math.abs(currentExcursion.peakC)
          ? reading.temperatureC
          : currentExcursion.peakC;

      result.push(currentExcursion);
      currentExcursion = null;
    }
  }

  if (currentExcursion) {
    const endTime = sortedReadings[sortedReadings.length - 1]?.timestamp;
    if (endTime) {
      currentExcursion.end = endTime;
    }

    currentExcursion.durationMinutes =
      Math.abs(
        Date.parse(currentExcursion.start) - Date.parse(currentExcursion.end),
      ) /
      (1000 * 60);

    result.push(currentExcursion);
    currentExcursion = null;
  }

  return result;
}
