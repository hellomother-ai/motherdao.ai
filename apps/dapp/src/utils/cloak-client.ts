import { Environment, cloakServers } from "@axis-finance/env";
import { Configuration, createCloakClient } from "@axis-finance/cloak";
import { environment } from "./environment";

const env = environment.current ?? Environment.PRODUCTION;

const cloakClient = createCloakClient(
  new Configuration({
    basePath: cloakServers[env].url,
  }),
);

export { cloakClient };
