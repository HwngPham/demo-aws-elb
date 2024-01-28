import dynamoose from "dynamoose";
import { fastifyPlugin } from "fastify-plugin";

export const dbPlugin = fastifyPlugin((_fastifyInstance, _opts, done) => {
  dynamoose.aws.ddb.set(
    new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: process.env.KEY_ID ?? "",
        secretAccessKey: process.env.ACCESS_KEY ?? "",
      },
      region: process.env.REGION ?? "ap-southeast-1",
    })
  );
  done();
});
