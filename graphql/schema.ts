import gql from "graphql-tag";
import { customTypeDefs } from "./locations/custom.gql";
import { queryTypeDefs } from "./locations/queries.gql";
import { mutationTypeDefs } from "./locations/mutations.gql";

export const typeDefs = gql`
  ${customTypeDefs}
  ${queryTypeDefs}
  ${mutationTypeDefs}
`;