export const readingSchema = {
  body: {
    type: "object",
    required: ["timestamp", "temperature_c"],
    properties: {
      timestamp: {
        type: "string",
        pattern:
          "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:\\d{2})$",
      },
      temperature_c: { type: "integer" },
    },
    additionalProperties: false,
  },
};
