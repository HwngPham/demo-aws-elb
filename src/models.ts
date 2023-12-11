import * as dynamoose from "dynamoose";

const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: "AKIAQWEFF6XE7D5URJHS",
    secretAccessKey: "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",
  },
  region: "ap-southeast-1",
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
