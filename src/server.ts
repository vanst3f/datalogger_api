import { buildApp } from "./app.js";

const fastify = buildApp();

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });

    console.log(fastify.printRoutes());
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
