export const excursionSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" },
    },
  },
};
