import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is missing");
}

const globalWithMongoose = global as typeof global & {
  mongoose?: {
    conn: any;
    promise: any;
  };
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

export default async function connectMongo() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(mongoUri!) as any;
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}