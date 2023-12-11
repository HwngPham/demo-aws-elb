import * as dynamoose from "dynamoose";

const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
  region: process.env.AWS_REGION,
});

dynamoose.aws.ddb.set(ddb);

const postSchema = new dynamoose.Schema(
  {
    id: String,
    content: String,
  },
  {
    saveUnknown: true,
    timestamps: true,
  }
);

export const Post = dynamoose.model("Post", postSchema);
