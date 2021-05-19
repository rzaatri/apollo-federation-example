import { gql } from "apollo-server";

const typeDefs = gql`
  type Media {
    screenshots: [String]
    videos: [String]
  }
  extend type Query {
    media: Media
  }
  extend type Product @key(fields: "id") {
    id: ID! @external
    media: Media
  }
`;

export default typeDefs;
