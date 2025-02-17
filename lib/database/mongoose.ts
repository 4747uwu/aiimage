import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Augment the global scope correctly
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

// Initialize the cached connection
let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { 
    conn: null, promise: null 
  };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'saasapp', bufferCommands: false 
    });

  cached.conn = await cached.promise;

  return cached.conn;
};