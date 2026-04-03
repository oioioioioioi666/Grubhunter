import { queryResolvers } from "./locations/queries";
import { mutationResolvers } from "./locations/mutations";

export const resolvers = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
};