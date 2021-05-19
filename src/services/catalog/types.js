import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Query {
    product(id: ID!): Product
  }
  type Product @key(fields: "id") {
    id: ID!
    name: String
    publisher: String
    description: String
    basePrice: Float
  }
`;

export default typeDefs;
