import { Schema, model } from "dynamoose";

export const Post = model(
  "Post",
  new Schema(
    {
      id: String,
      title: String,
      content: String,
    },
    {
      saveUnknown: true,
      timestamps: true,
    }
  )
);
