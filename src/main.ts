import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { dbPlugin } from "./plugins";
import { apiFileUpload, apiHealth, apiPost } from "./routes";

export const createServer = (configs: RouteShorthandOptions = {}) => {
  const app: FastifyInstance = Fastify({});

  app.register(helmet);
  app.register(cors, { origin: true });
  app.register(dbPlugin);

  app.register(apiHealth);
  app.register(apiPost);
  app.register(apiFileUpload);

  return app;
};
