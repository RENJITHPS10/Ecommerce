require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./Db/dbConnect");
const router = require("./Routes");
const errorHandler = require("./Middleware/errormiddleware");


const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.use("/api/v1", router);


app.use(errorHandler);


app.listen(5000, () => console.log("Server running on port 5000"));
