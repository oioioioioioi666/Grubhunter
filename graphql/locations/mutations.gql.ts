import gql from "graphql-tag";

export const mutationTypeDefs = gql`
  type Mutation {
    addWishlist(userId: String!, locationId: String!): Location
    removeWishlist(userId: String!, locationId: String!): Location
  }
`;