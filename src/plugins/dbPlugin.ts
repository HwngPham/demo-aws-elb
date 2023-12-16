import * as dynamoose from "dynamoose";
import { fastifyPlugin } from "fastify-plugin";

export const dbPlugin = fastifyPlugin((fastifyInstance, opts, done) => {
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
    region: process.env.AWS_REGION ?? "ap-southeast-1",
  });

  dynamoose.aws.ddb.set(ddb);
  done();
});
