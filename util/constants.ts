export const CAS_BASE_URL = process.env.CAS_BASE_URL
  ? process.env.CAS_BASE_URL
  : "https://fed.princeton.edu/cas/";

export const SERVICE_CALLBACK_URL = process.env.SERVICE_CALLBACK_URL
  ? process.env.SERVICE_CALLBACK_URL
  : "http://localhost.princeton.edu:3000/api/auth/callback";

export const PINATA_JWT = process.env.PINATA_JWT;

export const API_URL = process.env.API_URL ? process.env.API_URL : "";
export const PUBLIC_KEY = process.env.PUBLIC_KEY ? process.env.PUBLIC_KEY : "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY
  ? process.env.PRIVATE_KEY
  : "";

export const SIGNUP_STEP = {
  METAMASK: 0,
  NFT: 1,
  CONFIRM: 2,
};

export const STAGE_STATUS = {
  COMPLETE: "complete",
  CURRENT: "current",
  UPCOMING: "upcoming",
};

export const stepToStatus = (cur: number, id: number) => {
  if (id < cur) {
    return STAGE_STATUS.COMPLETE;
  } else if (id == cur) {
    return STAGE_STATUS.CURRENT;
  } else {
    return STAGE_STATUS.UPCOMING;
  }
};

export const DEFAULT_NFT_IMAGE = "/default.jpeg";
