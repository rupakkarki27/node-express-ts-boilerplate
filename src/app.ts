import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import MongoService from "./database/mongos";

import { v1Routes } from "./routes/v1";
import { API_BASE_APP } from "./config/secrets";

const app: Application = express();
const mongoService = new MongoService();

mongoService.connect();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_BASE_APP}`, v1Routes);

export default app;
