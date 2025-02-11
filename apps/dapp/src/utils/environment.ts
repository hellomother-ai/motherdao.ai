import { Environment } from "@axis-finance/env";

const env = import.meta.env.VITE_ENVIRONMENT;
const testnet = import.meta.env.VITE_TESTNET;
const mockBackend = import.meta.env.VITE_MOCK_BACKEND;

const environment = Object.freeze({
  isProduction: env === Environment.PRODUCTION,
  isStaging: env === Environment.STAGING,
  isTesting: env === Environment.TESTING,
  isDevelopment: env === Environment.DEVELOPMENT,
  isTestnet: testnet?.toLowerCase() === "true",
  isMockBackend: mockBackend?.toLowerCase() === "true",
  current: env as Environment,
});

export { environment };
