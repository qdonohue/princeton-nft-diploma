import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/prisma";
import { validateParser } from "../../../util/authUtils";

const CAS_BASE_URL = process.env.CAS_BASE_URL
  ? process.env.CAS_BASE_URL
  : "https://fed.princeton.edu/cas/";

const SERVICE_CALLBACK_URL = process.env.SERVICE_CALLBACK_URL
  ? process.env.SERVICE_CALLBACK_URL
  : "http://localhost:3000/api/auth/callback";

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const ticket = req.query["ticket"] as string;
  console.log("Ticket from request:");
  console.log(ticket);

  const params = {
    service: SERVICE_CALLBACK_URL,
    ticket: ticket,
  };

  const queryParams = new URLSearchParams({ ...params });

  const validateURL = `${CAS_BASE_URL}validate?${queryParams.toString()}`;

  const resp = await axios.get(validateURL);

  //   At this point, check if
  console.log(validateParser(resp.data));

  res.status(200).json(validateParser(resp.data));
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
