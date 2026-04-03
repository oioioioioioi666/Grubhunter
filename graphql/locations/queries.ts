import {
  findAllLocations,
  findLocationById,
  findWishlistLocations,
} from "@/mongoose/locations/services";

export const queryResolvers = {
  allLocations: async () => {
    return await findAllLocations();
  },

  locationsById: async (_parent: unknown, args: { id: string }) => {
    const result = await findLocationById({ id: args.id });

    if (!result) {
      return [];
    }

    return [result];
  },

  onUserWishlist: async (_parent: unknown, args: { userId: string }) => {
    return await findWishlistLocations({ userId: args.userId });
  },
};