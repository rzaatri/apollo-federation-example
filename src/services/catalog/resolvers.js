import data from './data.js';

const resolvers = {
  Query: {
    product(parent, args, context, info) {
      console.log('🗂 catalog: calling product query resolver');
      return data.find(data => data.id === args.id);
    },
  },
  Product: {
    __resolveReference(object) {
      console.log('🗂 catalog: calling __resolveReference product query resolver');
      return data.find(data => data.id === object.id);
    }
  }
};

export default resolvers;
