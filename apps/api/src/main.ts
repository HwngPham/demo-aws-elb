import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { apiHealth } from "./routes/health";

export const createServer = (configs: RouteShorthandOptions = {}) => {
  const app: FastifyInstance = Fastify({});

  app.register(helmet);
  app.register(apiHealth);
  app.register(cors, { origin: true });

  return app;
};
