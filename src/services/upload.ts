import { Upload } from "@aws-sdk/lib-storage";
import { s3Client } from "../plugins";

export const uploadFile = async (file: any) => {
  return new Upload({
    client: s3Client,
    params: {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.filename,
      Body: file.file,
    },
  }).done();
};
