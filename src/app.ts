import Fastify, { type FastifyInstance } from "fastify";

export function buildApp(): FastifyInstance {
  const fastify: FastifyInstance = Fastify({
    logger: true,
  });

  return fastify;
}
