export const labelSchema = {
  body: {
    type: "object",
    required: ["minC", "maxC", "toleranceMinutes"],
    properties: {
      minC: { type: "integer" },
      maxC: { type: "integer" },
      toleranceMinutes: { type: "integer" },
    },
    additionalProperties: false,
  },
};
