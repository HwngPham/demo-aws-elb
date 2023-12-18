import {
  S3Client,
  ListBucketsCommand,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";
import { fastifyPlugin } from "fastify-plugin";

export let s3Client: S3Client;

export const s3Plugin = fastifyPlugin((_fastifyInstance, _opts, done) => {
  s3Client = new S3Client({
    region: process.env.AWS_REGION ?? "ap-southeast-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
  });
  ensureBucketExist().then(() => done());
});

const ensureBucketExist = async () => {
  const { Buckets } = await s3Client.send(new ListBucketsCommand({}));
  const currentBucket = Buckets?.find(
    ({ Name }) => Name === process.env.AWS_S3_BUCKET
  );

  if (currentBucket) return;

  await s3Client.send(
    new CreateBucketCommand({ Bucket: process.env.AWS_S3_BUCKET ?? "bucket" })
  );
};
