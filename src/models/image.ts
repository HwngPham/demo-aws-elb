import { Schema, model } from "dynamoose";

export const Image = model(
  "Image",
  new Schema(
    {
      id: String,
      name: String,
      url: String,
    },
    {
      saveUnknown: true,
      timestamps: true,
    }
  )
);
