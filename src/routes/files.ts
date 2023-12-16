import { FastifyInstance } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "../services";
import { Image } from "../models";
import { getFile } from "../services/upload";

export const apiFileUpload = async (app: FastifyInstance) => {
  app.post("/files", async (req, res) => {
    const file = await req.file();

    try {
      const { Key, Location } = await uploadFile(file);

      const img = await Image.create({
        id: uuidv4(),
        name: Key,
        url: Location,
      });

      res.status(200).send(img.toJSON());
    } catch (err) {
      res.status(500).send({
        message: "File upload failed",
        detail: String(err),
      });
    }
  });

  app.get("/files", async (req) => {
    // @ts-expect-error aa
    const { filename } = req.query ?? {};

    const file = await getFile(filename);
    console.log("file", file);
    return { aze: "aaa" };
  });
};
