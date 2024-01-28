import { FastifyInstance } from "fastify";
import Ajv from "ajv";

import { Image, Post } from "../models";
import { postSchema } from "../schemas";
import { genId } from "../utils";

export const apiPost = async (app: FastifyInstance) => {
  app.get("/posts/:id", async (req, res) => {
    const { id } = req.params as Record<string, any>;
    const post = await Post.get(id);

    if (!post)
      return res.code(404).send({ message: `Post with id ${id} is not found` });

    const images = await Image.scan("postId").eq(post.id).exec();

    return { result: { ...post, images: images ?? [] } };
  });

  app.get("/posts", async () => {
    const posts = await Post.scan().exec();
    const images = await Image.scan().exec();

    return {
      result: posts.map((post) => ({
        ...post,
        images: images.filter((image) => image.postId === post.id),
      })),
    };
  });

  app.post("/posts", async (req, res) => {
    const ajv = new Ajv();
    const payload = req.body as unknown as Record<string, string>;

    if (!ajv.validate(postSchema, payload)) {
      return res.status(400).send({
        detail: ajv.errors,
      });
    }

    const post = await Post.create({
      id: genId(),
      title: payload.title,
      content: payload.content,
    });

    return { result: post.toJSON() };
  });

  app.put("/posts/:id", async (req, res) => {
    const { id } = req.params as Record<string, any>;
    const post = await Post.get(id);
    if (!post)
      return res.code(404).send({ message: `Post with id ${id} is not found` });

    const ajv = new Ajv();
    const payload = req.body as unknown as Record<string, string>;
    if (!ajv.validate(postSchema, payload)) {
      return res.status(400).send({
        detail: ajv.errors,
      });
    }

    Object.assign(post, payload);
    post.save();

    return { result: post.toJSON() };
  });

  app.delete("/posts/:id", async (req, res) => {
    const { id } = req.params as Record<string, any>;
    const post = await Post.get(id);

    if (!post)
      return res.code(404).send({ message: `Post with id ${id} is not found` });

    await post.delete();
    return { result: { id } };
  });
};
