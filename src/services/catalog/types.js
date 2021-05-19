import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    user(id: ID!): User
  }
  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
  }
`;

export default typeDefs;
