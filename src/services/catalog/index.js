import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import typeDefs from './types.js';
import resolvers from './resolvers.js';

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 🗂 Catalog server ready at ${url}`);
});
