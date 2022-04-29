import type { NextApiRequest, NextApiResponse } from "next";
import { CAS_BASE_URL, SERVICE_CALLBACK_URL } from "../../../util/constants";

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const params = {
    service: SERVICE_CALLBACK_URL,
  };

  const queryParams = new URLSearchParams({ ...params });

  const redirectUrl = `${CAS_BASE_URL}login?${queryParams.toString()}`;

  res.redirect(redirectUrl);
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
