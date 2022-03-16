import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

// fallbacks to .env.production and can be served in production

export const ENVIRONMENT = process.env.NODE_ENV || "production";

if (fs.existsSync(`.env.${ENVIRONMENT}`)) {
  logger.debug(
    `Using .env.${ENVIRONMENT} file to supply config environment variables`
  );
  dotenv.config({ path: `.env.${ENVIRONMENT}` });
} else {
  logger.debug(
    "Using .env.example file to supply config environment variables"
  );
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}

export const PORT = process.env["PORT"];
export const API_BASE_APP = process.env["API_BASE_APP"];
export const JWT_SECRET = process.env["JWT_SECRET"];

if (!PORT) {
  logger.error("No port set. Set PORT in env file");
}

// export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const MONGODB_URI = process.env["MONGODB_URI"];

// if (!SESSION_SECRET) {
//   logger.error("No client secret. Set SESSION_SECRET environment variable.");
//   process.exit(1);
// }

// if (!MONGODB_URI) {
//   if (prod) {
//     logger.error(
//       "No mongo connection string. Set MONGODB_URI environment variable."
//     );
//   } else {
//     logger.error(
//       "No mongo connection string. Set MONGODB_URI_LOCAL environment variable."
//     );
//   }
//   process.exit(1);
// }
