import express, { Application Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import MongoService from "./database/mongos";
import passport from "passport";
import "./config/passport";

import { v1Routes, authRoutes } from "./routes/v1";
import { API_BASE_APP } from "./config/secrets";

// setup express application
const app: Application = express();
const mongoService = new MongoService();

// connect to database
mongoService.connect();

// initialize required middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/", (req: Request, res: Response) => {
  return res.status(200).json({status: true})
})

// routes for auth functions: signin, signup, etc.
app.use(`${API_BASE_APP}`, authRoutes);

// all other jwt protected routes
app.use(
  `${API_BASE_APP}`,
  passport.authenticate("jwt", { session: false }),
  v1Routes
);

export default app;
