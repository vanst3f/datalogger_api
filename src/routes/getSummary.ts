import type { FastifyInstance } from "fastify";
import { summarySchema } from "../schemas/summarySchema.js";
import { labelsDb, readingsDb } from "../db.js";
import { calculateSummary } from "../domain/calculateSummary.ts.js";

export async function getSummary(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: number } }>(
    "/labels/:id/summary",
    { schema: summarySchema },
    async (request, reply) => {
      const labelId = request.params.id;
      if (!labelId) {
        return reply
          .code(400)
          .send({ success: false, error: "Label ID is required" });
      }

      const label = labelsDb.getById(labelId);
      if (!label) {
        return reply
          .code(404)
          .send({ success: false, error: "Label not found" });
      }

      const readings = readingsDb.getAllById(labelId);
      if (readings.length === 0) {
        return reply.code(200).send({ message: "No readings found" });
      }

      const summary = calculateSummary(readings, label);
      return reply.code(200).send({
        message: "Summary calculated",
        data: summary,
      });
    },
  );
}
