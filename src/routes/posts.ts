import { FastifyInstance } from "fastify";
import { v4 as uuidv4 } from "uuid";
import Ajv from "ajv";

import { Image, Post } from "../models";
import { postSchema } from "../schemas";

export const apiPost = async (app: FastifyInstance) => {
  app.get("/posts/:id", async (req, res) => {
    const { id } = req.params as Record<string, any>;
    const post = await Post.get(id);

    if (!post) {
      return res
        .code(404)
        .send({ message: `Post with id ${id} is not found}` });
    }

    const images = await Image.scan("postId").eq(post.id).exec();

    return { result: { ...post, images: images ?? [] } };
  });

  app.get("/posts", async () => {
    const posts = await Post.scan().exec();

    return { result: posts };
  });

  app.post("/posts", async (req, res) => {
    const ajv = new Ajv();
    const payload = JSON.parse(req.body as unknown as string);
    if (!ajv.validate(postSchema, payload)) {
      return res.status(400).send({
        detail: ajv.errors,
      });
    }
    const post = await Post.create({
      id: uuidv4(),
      title: payload.title,
      content: payload.content,
    });

    return { result: post.toJSON() };
  });

  app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params as Record<string, any>;
    const post = await Post.get(id);

    if (!post) {
      return res
        .code(404)
        .send({ message: `Post with id ${id} is not found}` });
    }

    await post.delete();
    return { result: `Post with id=${id} is deleted` };
  });
};
