import { describe, it, expect } from "vitest";
import type { Label, Reading } from "./types.js";
import { calculateSummary } from "./calculate-summary.js";

describe("calculateSummary", () => {
  const mockLabel: Label = { minC: 2, maxC: 8, toleranceMinutes: 45 };

  it("should say that the status is approved if totalExcursionMinutes is smaller than toleranceMinutes", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 6 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 6 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 6 },
    ];

    const summary = calculateSummary(mockReadings, mockLabel);

    expect(summary.status).toBe("approved");
  });

  it("should say that the status is rejected if totalExcursionMinutes is larger than toleranceMinutes", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 6 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:30:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:45:00.000Z", temperatureC: 6 },
    ];

    const summary = calculateSummary(mockReadings, mockLabel);

    expect(summary.status).toBe("rejected");
  });

  it("should be rejected with negative temperatures", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 4 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 0 },
      { timestamp: "2026-11-06T15:45:00.000Z", temperatureC: -2 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: -5 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: -2 },
      { timestamp: "2026-11-06T15:30:00.000Z", temperatureC: -2 },
    ];

    const summary = calculateSummary(mockReadings, mockLabel);

    expect(summary.status).toBe("rejected");
  });

  it("should still be rejected with unordered readings", () => {
    const mockReadings: Reading[] = [
      { timestamp: "2026-11-06T14:30:00.000Z", temperatureC: 6 },
      { timestamp: "2026-11-06T14:45:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:45:00.000Z", temperatureC: 6 },
      { timestamp: "2026-11-06T15:00:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:15:00.000Z", temperatureC: 10 },
      { timestamp: "2026-11-06T15:30:00.000Z", temperatureC: 10 },
    ];

    const summary = calculateSummary(mockReadings, mockLabel);

    expect(summary.status).toBe("rejected");
  });
});
