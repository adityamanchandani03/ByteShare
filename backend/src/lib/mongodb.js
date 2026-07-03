var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import mongoose from "mongoose";
import { logger } from "./logger";
let isConnected = false;
async function connectMongoDB() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is required");
  }
  await mongoose.connect(uri);
  isConnected = true;
  logger.info("Connected to MongoDB");
}
__name(connectMongoDB, "connectMongoDB");
export {
  connectMongoDB
};
