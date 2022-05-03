import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable-serverless";
import { prisma } from "../../prisma/prisma";

import { PINATA_JWT } from "../../util/constants";
import { mintOnPinata } from "../../util/pinataUtils";

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`/api/mint: incoming POST request`);

  const data = new formidable.IncomingForm();
  data.keepExtensions = true;
  await data.parse(req, async (err: any, fields: any, files: any) => {
    const sessionKey = fields.session.replaceAll('"', "");
    // Verify that this is the session of a current user
    let user = await prisma.user.findFirst({
      where: { session: { key: sessionKey } },
      include: { nft: true },
    });

    if (!user) {
      console.log("Invalid user session");
      res.redirect("/");
    } else if (user.nft) {
      // Already minted an NFT
      console.log("User has already minted an NFT");
      res.redirect("/existingNFT");
    } else {
      console.log("Valid session + user!");
      const address = fields.address.replaceAll('"', "");
      // Signed in user w/ out NFT --> mint it
      const hash = await mintOnPinata(files.file.path, fields.metadata);

      // TODO: Call Dane's function

      // Create NFT
      const NftData = JSON.parse(fields.metadata);
      NftData.image = hash;
      NftData.address = address;

      // Update user object
      await prisma.user.update({
        where: { id: user.id },
        data: {
          nft: {
            create: {
              ...NftData,
            },
          },
        },
      });

      res.status(201).end();
    }
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
