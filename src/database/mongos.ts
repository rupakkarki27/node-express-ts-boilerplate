import mongoose from "mongoose";
import logger from "../config/logger";
import { MONGODB_URI } from "../config/secrets";

export default class MongoService {
  connect() {
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        logger.info("Connected to MONGODB database");
      })
      .catch((e) => logger.error(e.message));
  }
  disconnect() {
    mongoose.disconnect().then(() => {
      logger.info("Database disconnected");
    });
  }
}
