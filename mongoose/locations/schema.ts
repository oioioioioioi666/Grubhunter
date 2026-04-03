import { InferSchemaType, Schema } from "mongoose";

const LocationSchema = new Schema(
  {
    address: { type: String, required: true },
    zipcode: { type: String, required: true },
    borough: { type: String, required: true },
    cuisine: { type: String, required: true },
    grade: { type: String, required: true },
    name: { type: String, required: true },
    on_wishlist: [{ type: String }],
    location_id: { type: String, required: true },
  },
  {
    collection: "locations",
  }
);

export type LocationType = InferSchemaType<typeof LocationSchema>;
export default LocationSchema;