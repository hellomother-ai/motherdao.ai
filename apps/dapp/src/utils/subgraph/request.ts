import {
  request as graphqlRequest,
  RequestDocument,
  Variables,
} from "graphql-request";
import { DocumentNode } from "graphql";

export async function request<TDocument = unknown>(
  endpoint: string,
  document: RequestDocument | DocumentNode,
  variables?: Variables,
) {
  const response = await graphqlRequest<TDocument, Variables>(
    endpoint,
    document,
    variables,
    { "Content-Type": "application/json" },
  );

  return response;
}
