import "dotenv/config";
import proxyLambda from "@fastify/aws-lambda";
import { createServer } from "./src/main";

const server = createServer();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const host = process.env.HOST ?? "localhost";
const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  server.listen({ port, host }, () => {
    console.log(`Development server is running on http://${host}:${port}`);
    console.log(server.printRoutes());
  });
}

export const handler = proxyLambda(server);
