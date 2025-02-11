const BASE_URL = Cypress.env("VITE_APP_URL");

// Mainnet chain ID for mainnet build testing
const blastSepoliaChainId = "168587773";

// Testnet chain ID for testnet build testing
const baseChainId = "8453";

const LAUNCH_ID =
  Cypress.env("VITE_TESTNET") === "true" ? blastSepoliaChainId : baseChainId;

const URLS = {
  HOME: `${BASE_URL}/#/`,
  CREATE_LAUNCH: `${BASE_URL}/#/create/auction`,
  CURATOR: `${BASE_URL}/#/curator`,
  CURATORS: `${BASE_URL}/#/curators`,
  REFERRALS: `${BASE_URL}/#/refer`,
  LAUNCH: `${BASE_URL}/#/${LAUNCH_ID}/0`,

  /** TESTNET ONLY PAGES */
  FAUCET: `${BASE_URL}/#/faucet`,
  DEPLOY: `${BASE_URL}/#/deploy`,
} as const;

export { URLS };
