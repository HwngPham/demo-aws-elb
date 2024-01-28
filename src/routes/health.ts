import { FastifyInstance } from "fastify";

export const apiHealth = async (app: FastifyInstance) => {
  app.get("/health", () => ({ message: "ok 1" }));
  app.get("/", (req, _res) => ({
    // @ts-expect-error un-typed inject
    event: req?.awsLambda?.event,
    // @ts-expect-error un-typed inject
    context: req?.awsLambda?.context,
  }));
};
