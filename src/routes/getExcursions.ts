import type { FastifyInstance } from "fastify";
import { excursionSchema } from "../schemas/excursionSchema.js";
import { labelsDb, readingsDb } from "../db.js";
import { calculateExcursions } from "../domain/calculateExcursions.js";

export async function getExcursions(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: number } }>(
    "/labels/:id/excursions",
    { schema: excursionSchema },
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

      const excursions = calculateExcursions(readings, label);
      if (excursions.length === 0) {
        return reply.code(200).send({
          success: true,
          message: "No excursions or readings found",
          data: excursions,
        });
      }

      return reply.code(200).send({
        success: true,
        message: "Excursions found",
        data: excursions,
      });
    },
  );
}
