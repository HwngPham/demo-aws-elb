export const postSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    content: { type: "string" },
  },
  required: ["title", "content"],
  additionalProperties: false,
};
