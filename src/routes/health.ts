import { FastifyInstance } from "fastify";

export const apiHealth = async (app: FastifyInstance) => {
  app.get("/health", () => ({ message: "ok" }));
};