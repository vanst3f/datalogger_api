export const readingSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" },
    },
  },

  body: {
    type: "array",
    minItems: 1,
    items: {
      type: "object",
      required: ["timestamp", "temperatureC"],
      additionalProperties: false,
      properties: {
        timestamp: {
          type: "string",
          pattern:
            "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(Z|[+-]\\d{2}:\\d{2})$",
        },
        temperatureC: { type: "integer" },
      },
    },
  },
};
