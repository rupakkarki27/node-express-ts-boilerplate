import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Request");
});

export default app;
