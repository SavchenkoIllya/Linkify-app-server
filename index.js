import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import categoryRoute from "./routes/category.js";
import linkRoute from "./routes/link.js";
import fileUpload from "express-fileupload";

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/link", linkRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lh0mnyi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
}

start();
