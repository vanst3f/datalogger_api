import { type FastifyInstance } from "fastify";
import { labelsDb } from "../db.js";

import type { Label } from "../domain/types.js";
import { labelSchema } from "../schemas/labelSchema.js";

export async function createLabel(fastify: FastifyInstance) {
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

      const createdLabel = labelsDb.save(label);

      return reply
        .code(201)
        .send({ message: "Label created", data: createdLabel });
    },
  );
}
