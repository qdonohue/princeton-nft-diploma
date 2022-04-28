import type { NextApiRequest, NextApiResponse } from "next";

const CAS_BASE_URL = process.env.CAS_BASE_URL
  ? process.env.CAS_BASE_URL
  : "https://fed.princeton.edu/cas/";

const SERVICE_CALLBACK_URL = process.env.SERVICE_CALLBACK_URL
  ? process.env.SERVICE_CALLBACK_URL
  : "http://localhost:3000/api/auth/callback";

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse) => {
  const params = {
    service: SERVICE_CALLBACK_URL,
  };

  const queryParams = new URLSearchParams({ ...params });

  const redirectUrl = `${CAS_BASE_URL}login?${queryParams.toString()}`;
  console.log("Redirect URL is: ");
  console.log(redirectUrl);

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
