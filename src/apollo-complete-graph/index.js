import { ApolloServer, gql } from 'apollo-server';
import catalog from '../services/catalog/data.js';
import media from '../services/media/data.js';
import getPrimeFactors from '../services/media/getPrimeFactors.js';

const enableExpensiveLogic = false;

// TYPEDEFS
const typeDefs = gql`
  type Product {
    id: ID!
    author: String
    name: String
    publisher: String
    description: String
    basePrice: Float
    userPrice(discountPercent: Float): Float
    media: Media
  }

  type Media {
    screenshots: [String]
    videos: [String]
  }

  type Query {
    product(id: ID!): Product
    media: Media
  }
`;

// RESOLVERS
const resolvers = {
  Query: {
    product(parent, args, context, info) {
      return catalog.find(data => data.id === args.id);
    },
    media() {
      const reducer = (acc, gameMedia = { screenshots: [], videos: []}) => 
        ({ screenshots: [...acc.screenshots, ...gameMedia.screenshots], videos: [...acc.videos, ...gameMedia.videos] });

      // Note: Only added to test performance isolation
      if (enableExpensiveLogic) {
        getPrimeFactors(Math.floor(Math.random()*1000000000));
      }

      return Object.values(media).reduce(reducer);
    }
  },
  Product: {
    userPrice(parent, args, context, info) {
      return parent.basePrice - (parent.basePrice * args.discountPercent);
    },
    media(parent, args, context, info) {
      return media[parent.id];
    }
  }
};

// SERVER INIT / START
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
