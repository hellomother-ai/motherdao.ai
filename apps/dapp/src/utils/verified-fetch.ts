import { type VerifiedFetch, createVerifiedFetch } from "@helia/verified-fetch";

let verifiedFetch: VerifiedFetch;

const initializeVerifiedFetch = async () => {
  verifiedFetch = await createVerifiedFetch({
    gateways: [
      "https://ipfs.io",
      "https://nftstorage.link",
      "https://gateway.pinata.cloud",
      "https://w3s.link",
    ],
  });
};

export { verifiedFetch, initializeVerifiedFetch };
