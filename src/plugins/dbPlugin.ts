import dynamoose from "dynamoose";
import { fastifyPlugin } from "fastify-plugin";

export const dbPlugin = fastifyPlugin((_fastifyInstance, _opts, done) => {
  dynamoose.aws.ddb.set(
    new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
      },
      region: process.env.AWS_REGION ?? "ap-southeast-1",
    })
  );
  done();
});
