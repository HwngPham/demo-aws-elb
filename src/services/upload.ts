import { Upload } from "@aws-sdk/lib-storage";
import { s3Client } from "../plugins";
import { GetObjectCommand } from "@aws-sdk/client-s3";

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

export const getFile = async (fileName: string) => {
  return s3Client.send(
    new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
    })
  );
};
