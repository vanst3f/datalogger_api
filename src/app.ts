import Fastify, { type FastifyInstance } from "fastify";
import { createLabel } from "./routes/createLabel.js";
import { createReadings } from "./routes/createReadings.js";
import { getExcursions } from "./routes/getExcursions.js";
import { getSummary } from "./routes/getSummary.js";

export function buildApp(): FastifyInstance {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  fastify.register(createLabel);
  fastify.register(createReadings);
  fastify.register(getExcursions);
  fastify.register(getSummary);

  return fastify;
}
