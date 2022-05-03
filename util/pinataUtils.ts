import FormData from "form-data";
import axios from "axios";

import fs from "fs";

import { PINATA_JWT } from "./constants";

const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const PINATA_AUTH = `Bearer ${PINATA_JWT}`;

export const mintOnPinata = async (filePath: any, metadata: any) => {
  const fd = new FormData();

  fd.append("file", fs.createReadStream(filePath));
  fd.append("pinataMetadata", metadata);

  const reply = await axios.post(url, fd, {
    headers: {
      "Content-Type": `multipart/form-data`,
      Authorization: PINATA_AUTH,
    },
  });
  const { IpfsHash } = reply.data;
  return IpfsHash;
};
