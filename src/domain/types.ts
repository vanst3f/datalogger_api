export type Label = {
  minC: number;
  maxC: number;
  toleranceMinutes: number;
};

export type Reading = {
  timestamp: string;
  temperatureC: number;
};

export type Excursion = {
  start: string;
  end: string;
  durationMinutes: number;
  peakC: number;
};

export type Summary = {
  minC: number;
  maxC: number;
  averageC: number;
  totalExcursionMinutes: number;
  status: "approved" | "rejected";
};
