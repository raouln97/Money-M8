import express, { json, urlencoded } from "express";
import {config} from "./config";
import mongoose from "mongoose";
import { RegisterRoutes } from "../build/routes";

const app = express();

const url =
  "mongodb+srv://raoulnanwani:EO3OiggXjYFhfS83@crudappcluster.yxyohpg.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url);
const con = mongoose.connection;
app.use(json()); // Parse JSON bodies
app.use(urlencoded({ extended: true })); // Parse URL-encoded bodies

RegisterRoutes(app);
try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
