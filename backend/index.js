import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./Db/dbConnect.js";
import router from "./Routes/index.js";
import errorHandler from "./Middleware/errormiddleware.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandler);

app.listen(5000, () => console.log("Server running on port 5000"));
