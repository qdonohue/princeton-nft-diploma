import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";
import { randomSession, validateParser } from "../../../util/authUtils";
import { CAS_BASE_URL, SERVICE_CALLBACK_URL } from "../../../util/constants";

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const ticket = req.query["ticket"] as string;

  const params = {
    service: SERVICE_CALLBACK_URL,
    ticket: ticket,
  };

  const queryParams = new URLSearchParams({ ...params });

  const validateURL = `${CAS_BASE_URL}validate?${queryParams.toString()}`;

  const resp = await axios.get(validateURL);

  const userName = validateParser(resp.data);

  if (userName) {
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { netId: userName },
      include: { session: true, nft: true },
    });

    if (!user) {
      // If it doesn't exist create it.
      user = await prisma.user.create({
        data: { netId: userName },
        include: { session: true, nft: true },
      });
    } else if (user.session) {
      // If it does exist, invalidate earlier session
      await prisma.session.delete({ where: { id: user.session.id } });
    }

    // TODO: Make sure this doesn't conflict with an existing session
    const sessionKey = randomSession();

    await prisma.user.update({
      where: { id: user.id },
      data: { session: { create: { key: sessionKey } } },
    });

    if (user?.nft) {
      res.redirect(`/me/${sessionKey}`);
    }

    res.redirect(`/create/${sessionKey}`);
  } else {
    res.redirect("/invalid");
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    handleGetRequest(req, res);
  } else if (req.method === "POST") {
    // Not supported
    res.status(400).end();
  }
};

export default handler;
