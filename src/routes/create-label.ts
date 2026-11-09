import { type FastifyInstance } from "fastify";
import { InMemoryDatabase } from "../persistence/inmemory-db.js";

import type { Label } from "../domain/types.js";
import { labelSchema } from "../schemas/label-schema.js";

export async function createLabel(fastify: FastifyInstance) {
  const labelDb = new InMemoryDatabase<Label>();

  fastify.post<{ Body: Label }>(
    "/labels",
    { schema: labelSchema },
    async (request, reply) => {
      const { minC, maxC, toleranceMinutes } = request.body;

      const label: Label = {
        minC: minC,
        maxC: maxC,
        toleranceMinutes: toleranceMinutes,
      };

      labelDb.save(label);
      return reply.code(201).send(label);
    },
  );
}
