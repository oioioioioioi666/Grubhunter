import { updateWishlist } from "@/mongoose/locations/services";

interface WishlistArgs {
  userId: string;
  locationId: string;
}

export const mutationResolvers = {
  addWishlist: async (
    _parent: unknown,
    args: WishlistArgs,
    _context: unknown
  ) => {
    return await updateWishlist(args.locationId, args.userId, true);
  },

  removeWishlist: async (
    _parent: unknown,
    args: WishlistArgs,
    _context: unknown
  ) => {
    return await updateWishlist(args.locationId, args.userId, false);
  },
};