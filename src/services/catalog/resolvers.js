import data from './data.js';

const resolvers = {
  Query: {
    user(parent, args, context, info) {
      console.log('calling from query');
      return data.find(data => data.id === args.id);
    },
  },
  User: {
    __resolveReference(object) {
      console.log('calling from resolveReference');
      console.log(object);
      return data.find(data => data.id === object.id);
    }
  }
};

export default resolvers;
