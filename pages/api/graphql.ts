import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

const server = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextApiRequest>(server, {
  context: async (_req: NextApiRequest, _res: NextApiResponse) => {
    return {};
  },
});

export default handler;