import data from './data.js';

const resolvers = {
  Review: {
    author(review) {
      return { __typename: "User", id: review.authorID };
    }
  },
  User: {
    reviews(user) {
      return data.filter(review => review.authorID === user.id);
    },
    numberOfReviews(user) {
      return data.filter(review => review.authorID === user.id).length;
    },
  },
};

export default resolvers;
