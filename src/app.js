import express from "express";
import { router as apiRoutes} from "./routes/index.js"

export const app = express();

//use Middleware called .json
app.use(express.json());

app.use("/api", apiRoutes);