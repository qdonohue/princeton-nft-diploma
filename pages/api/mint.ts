import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable-serverless";

import { PINATA_JWT } from "../../util/constants";
import { mintOnPinata } from "../../util/pinataUtils";

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/mint: incoming POST request`);

  const data = new formidable.IncomingForm();
  data.keepExtensions = true;
  await data.parse(req, async (err: any, fields: any, files: any) => {
    const hash = await mintOnPinata(files.file.path, fields.metadata);
    console.log(hash);
    res.status(200).end();
  });
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    handlePostRequest(req, res);
  } else {
    res.status(400).end();
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
