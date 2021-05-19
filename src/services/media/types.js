import { gql } from "apollo-server";

const typeDefs = gql`
  type Review @key(fields: "id") {
    id: ID!
    body: String
    author: User
  }
  extend type User @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
    numberOfReviews: Int
  }
`;

export default typeDefs;
