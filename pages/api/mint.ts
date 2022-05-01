import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/mint: incoming POST request`);

  console.log(req.body);

  const { session, name, image, description, wallet, file } = req.body;

  // Look up session
  try {
    const sesh = await prisma.session.findUnique({ where: { key: session } });

    if (sesh) {
      // TODO: Handle if NFT was already created

      // TODO: Code to actually mint NFT
      // TODO: Code to actually create image (if needed!)
      await prisma.user.update({
        where: { id: sesh.userId },
        data: {
          nft: {
            create: {
              name: name,
              description: description,
              image: image,
              address: wallet,
            },
          },
        },
      });
      res.status(201).end();
    } else {
      // Not a proper session - TODO on doing better job here
      res.redirect("/"); // send back to home page.
    }
  } catch (e) {
    res.status(500).end();
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    handlePostRequest(req, res);
  } else {
    res.status(400).end();
  }
};

export default handler;
