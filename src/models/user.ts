import { Schema, model } from "dynamoose";

export const User = model(
  "User",
  new Schema(
    {
      id: String,
      name: String,
      password: String,
      salt: String,
    },
    {
      saveUnknown: false,
      timestamps: true,
    }
  )
);
