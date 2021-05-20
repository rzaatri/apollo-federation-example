
const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const useServiceName = process.env.USE_SERVICE_NAME;
const catalogUrl = `http://${useServiceName ? 'catalog' : 'localhost'}:4001/graphql`;
const mediaUrl = `http://${useServiceName ? 'media' : 'localhost'}:4002/graphql`;
const priceUrl = `http://${useServiceName ? 'price' : 'localhost'}:4003/graphql`;

const gateway = new ApolloGateway({
  serviceList: [
    { name: "catalog", url: catalogUrl },
    { name: "media", url: mediaUrl },
    { name: "price", url: priceUrl},
  ],

  // Experimental: Enabling this enables the query plan view in Playground.
  __exposeQueryPlanExperimental: true,
});

(async () => {
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Gateway Server ready at ${url}`);
  });
})();
