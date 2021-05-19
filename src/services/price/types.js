import { gql } from "apollo-server";

const typeDefs = gql`
  extend type Product @key(fields: "id") {
    id: ID! @external
    basePrice: Float @external
    userPrice(discountPercent: Float): Float @requires(fields: "basePrice")
  }
`;

export default typeDefs;
