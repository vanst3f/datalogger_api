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

  for (let i = 0; i < sortedReadings.length; i++) {
    const reading = sortedReadings[i];
    if (!reading) continue;

    if (
      (reading.temperatureC < label.minC ||
        reading.temperatureC > label.maxC) &&
      currentExcursion === null
    ) {
      currentExcursion = {
        start: reading.timestamp,
        end: "",
        durationMinutes: 0,
        peakC: reading.temperatureC,
      };
    }

    if (
      (reading.temperatureC < label.minC ||
        reading.temperatureC > label.maxC) &&
      currentExcursion !== null
    ) {
      currentExcursion.peakC =
        Math.abs(reading.temperatureC) > Math.abs(currentExcursion.peakC)
          ? reading.temperatureC
          : currentExcursion.peakC;
    }

    if (
      reading.temperatureC >= label.minC &&
      reading.temperatureC <= label.maxC &&
      currentExcursion !== null
    ) {
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

    if (
      (reading.temperatureC < label.minC ||
        reading.temperatureC > label.maxC) &&
      currentExcursion !== null &&
      i === sortedReadings.length - 1
    ) {
      currentExcursion.end = reading.timestamp;
      currentExcursion.durationMinutes =
        Math.abs(
          Date.parse(currentExcursion.start) - Date.parse(currentExcursion.end),
        ) /
        (1000 * 60);

      result.push(currentExcursion);
      currentExcursion = null;
    }
  }

  return result;
}
