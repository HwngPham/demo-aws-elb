import "dotenv/config";

import { createServer } from "./src/main";

const server = createServer();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const host = process.env.HOST ?? "localhost";

console.log(port, host);
server.listen({ port, host }, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log(server.printRoutes());
});
