import { describe, it, expect } from "vitest";
import type { Label, Reading, Excursion } from "./types.js";

import { calculateExcursions } from "./calculateExcursions.js";

describe("calculateExcursions", () => {
  const mockLabel: Label = { minC: 2, maxC: 8, toleranceMinutes: 45 };

  it("should be an empty array if there are no excursions", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 4 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 8 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 6 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 5 },
    ];

    const excursions: Excursion[] = calculateExcursions(
      mockReadings,
      mockLabel,
    );

    expect(excursions).toEqual([]);
  });

  it("should be able to calculate multiple excursions", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 4 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 8 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:30:00.000Z", temperatureC: 8 },
      { timestamp: "2026-11-06T15:45:00.000Z", temperatureC: 4 },
    ];

    const excursions: Excursion[] = calculateExcursions(
      mockReadings,
      mockLabel,
    );

    expect(excursions.length).toBe(2);
  });

  it("should capture the peak temperature on negative values", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 4 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 2 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: -5 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 2 },
    ];

    const excursions: Excursion[] = calculateExcursions(
      mockReadings,
      mockLabel,
    );

    expect(excursions[excursions.length - 1]?.peakC).toBe(-5);
  });

  it("should calculate the duration from the first excursion to recovery", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 4 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 8 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 12 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 16 },
      { timestamp: "2026-11-06T15:30:00.000Z", temperatureC: 8 },
      { timestamp: "2026-11-06T15:45:00.000Z", temperatureC: 4 },
    ];

    const excursions: Excursion[] = calculateExcursions(
      mockReadings,
      mockLabel,
    );

    expect(excursions[excursions.length - 1]?.durationMinutes).toBe(30);
  });

  it("should have a duration of 15 if the only and last two readings are outside the range", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 4 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 8 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 12 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 16 },
    ];

    const excursions: Excursion[] = calculateExcursions(
      mockReadings,
      mockLabel,
    );

    expect(excursions[excursions.length - 1]?.durationMinutes).toBe(15);
  });

  it("should have a duration of 0 if the only and last reading is outside the range", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 4 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 8 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 12 },
    ];

    const excursions: Excursion[] = calculateExcursions(
      mockReadings,
      mockLabel,
    );

    expect(excursions[excursions.length - 1]?.durationMinutes).toBe(0);
  });

  it("should still calculate correctly if the readings aren't in order", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 4 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 12 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 8 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 16 },
    ];

    const excursions: Excursion[] = calculateExcursions(
      mockReadings,
      mockLabel,
    );

    console.log(excursions);
    expect(excursions[0]?.durationMinutes).toBe(15);
  });
});
