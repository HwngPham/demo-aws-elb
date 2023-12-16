import { FastifyInstance } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services";
import { Image, Post } from "../models";

export const apiFileUpload = async (app: FastifyInstance) => {
  app.post("/posts/:postId/files", async (req, res) => {
    const file = await req.file();
    const { postId } = req.params as Record<string, any>;
    const post = await Post.get(postId);

    if (!post)
      return res.status(404).send({
        message: `Post ${postId} is not found.`,
      });

    try {
      const { Key, Location } = await uploadFile(file);
      const img = await Image.create({
        id: uuidv4(),
        name: Key,
        url: Location,
        postId: post.id,
      });

      res.status(200).send(img.toJSON());
    } catch (err) {
      res.status(500).send({
        message: "File upload failed",
        detail: String(err),
      });
    }
  });
};
