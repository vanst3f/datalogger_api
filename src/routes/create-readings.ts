import type { FastifyInstance } from "fastify";
import { InMemoryDatabase } from "../persistence/inmemory-db.js";

import type { Reading } from "../domain/types.js";
import { readingSchema } from "../schemas/reading-schema.js";

export async function createReadings(fastify: FastifyInstance) {
  const readingDb = new InMemoryDatabase<Reading>();

  fastify.post(
    "/:id/readings",
    { schema: readingSchema },
    async (request, reply) => {},
  );
}
