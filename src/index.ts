import express, { json, urlencoded } from "express";
import { config } from "./config";
import mongoose from "mongoose";
import { RegisterRoutes } from "../build/routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsOptions = {
  origin: process.env.CORS_ALLOWED_ADD, // Replace with the origin you want to allow
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

// const url =
//   "mongodb+srv://raoulnanwani:EO3OiggXjYFhfS83@crudappcluster.yxyohpg.mongodb.net/?retryWrites=true&w=majority";
// mongoose.connect(url);
// const con = mongoose.connection;
app.use(json()); // Parse JSON bodies
app.use(cors(corsOptions));
app.use(urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

RegisterRoutes(app);
// try {
//   con.on("open", () => {
//     console.log("connected");
//   });
// } catch (error) {
//   console.log("Error: " + error);
// }

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
