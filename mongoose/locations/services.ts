import connectMongo from "@/middleware/mongoose";
import LocationModel from "./model";
import { FindLocationByIdParams, FindWishlistParams } from "./custom";

async function findLocations(filter = {}) {
  await connectMongo();
  return LocationModel.find(filter);
}

export async function findAllLocations() {
  return findLocations();
}

export async function findLocationById({ id }: FindLocationByIdParams) {
  await connectMongo();
  return LocationModel.findOne({ location_id: id });
}

export async function findWishlistLocations({ userId }: FindWishlistParams) {
  await connectMongo();
  return LocationModel.find({ on_wishlist: userId });
}

export async function updateWishlist(id: string, userId: string, add: boolean) {
  await connectMongo();

  if (add) {
    return LocationModel.findOneAndUpdate(
      { location_id: id },
      { $addToSet: { on_wishlist: userId } },
      { new: true }
    );
  }

  return LocationModel.findOneAndUpdate(
    { location_id: id },
    { $pull: { on_wishlist: userId } },
    { new: true }
  );
}