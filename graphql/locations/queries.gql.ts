import gql from "graphql-tag";

export const queryTypeDefs = gql`
  type Query {
    allLocations: [Location]
    locationsById(id: String!): [Location]
    onUserWishlist(userId: String!): [Location]
  }
`;