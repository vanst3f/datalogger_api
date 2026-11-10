import type { FastifyInstance } from "fastify";
import { InMemoryDatabase } from "../repository/inMemoryDatabase.js";
import { readingsDb } from "../db.js";

import type { Reading } from "../domain/types.js";
import { readingSchema } from "../schemas/readingSchema.js";
import { getLabelById } from "../repository/getLabelById.js";

export async function createReadings(fastify: FastifyInstance) {
  fastify.post<{ Params: { id: number }; Body: Reading[] }>(
    "/labels/:id/readings",
    { schema: readingSchema },
    async (request, reply) => {
      const labelId = request.params.id;
      if (!labelId) {
        return reply.code(400).send({ error: "Label ID is required" });
      }
      const incomingArray = request.body;

      const label = await getLabelById(labelId);
      if (!label) {
        return reply.code(404).send({ error: "Label not found" });
      }

      const readings = incomingArray.map((reading) => ({
        labelId: labelId,
        ...reading,
      }));

      const createdReadings = readingsDb.saveMany(readings);

      return reply
        .code(201)
        .send({ message: "Readings created", data: createdReadings });
    },
  );
}
