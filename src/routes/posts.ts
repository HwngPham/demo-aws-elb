import { FastifyInstance } from "fastify";
import { v4 as uuidv4 } from "uuid";

import { Post } from "../models";

export const apiPost = async (app: FastifyInstance) => {
  app.get("/posts/:id", async (req, res) => {
    // @ts-expect-error add id type
    const { id } = req.params;
    const post = await Post.get(id);

    if (!post) {
      return res
        .code(404)
        .send({ message: `Post with id ${id} is not found}` });
    }

    return { result: post };
  });

  app.get("/posts", async () => {
    const posts = await Post.scan().exec();

    return { result: posts };
  });

  app.post("/posts", async (req) => {
    const post = await Post.create({
      id: uuidv4(),
      content: new Date().toString(),
    });

    return { result: post };
  });

  app.delete("/posts/:id", async (req, res) => {
    // @ts-expect-error add id type
    const { id } = req.params;
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
