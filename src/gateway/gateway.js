
const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "catalog", url: "http://localhost:4001/graphql" },
    { name: "media", url: "http://localhost:4002/graphql" },
    { name: "price", url: "http://localhost:4003/graphql" },
  ],

  // Experimental: Enabling this enables the query plan view in Playground.
  // __exposeQueryPlanExperimental: false,
});

(async () => {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
