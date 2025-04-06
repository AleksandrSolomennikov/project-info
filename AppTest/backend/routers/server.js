import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import cors from "cors";
import apiRouter from "./api.js";
import fs from "fs";
//import db from "../database/db.js"

//functions
import { getplayer } from "../Controllers/match.controller.js";
import { loadData } from "../database/insertData.js";
import { clearData } from "../database/insertData.js";
import { requestBuilder } from "./api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

app.use("/api", apiRouter);

app.get("/main", (req, res) => {
  res.send("⚠️ Here will be the main page, we are working on it! ⚠️");
});

app.get("/main/stats", async (req, res) => {
  try {
    const data = await requestBuilder("football", "teams", "Manchester United");
    res.send(data);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).send("Failed to fetch stats");
  }
});

/*app.get("/main/stats/data", (req, res) => {
  loadData();
  res.send("🔄 Database is being updated, see the logs in console!");
});*/

app.get("/clear", async (req, res) => {
  clearData();
  res.send("⚠️ Database cleared!");
});

//app.get("/api/player", getplayer);
app.get("api/match");

// Middleware
app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); // Allows the server to parse incoming JSON data in requests (e.g., req.body).