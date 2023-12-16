import { FastifyInstance } from "fastify";
import { uploadFile } from "../services";
import { Image, Post } from "../models";
import { genId } from "../utils";

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
        id: genId(),
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
