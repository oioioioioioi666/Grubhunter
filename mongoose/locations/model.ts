import mongoose from "mongoose";
import LocationSchema from "./schema";

const LocationModel =
  mongoose.models.Location ||
  mongoose.model("Location", LocationSchema);

export default LocationModel;