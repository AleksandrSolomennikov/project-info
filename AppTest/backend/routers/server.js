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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import Widget from "../Controllers/widget.jsx";
=======
import { loadData } from "../database/insertData.js" ;
>>>>>>> 2546818 (Comments changes pt. 3)
=======
import { loadData } from "../database/insertData.js";
import { clearData } from "../database/insertData.js";
import { requestBuilder } from "./api.js";
>>>>>>> 484f562 (API changes + cleaing function)
=======
import { loadData } from "../database/insertData.js";
import { clearData } from "../database/insertData.js";
import { requestBuilder } from "./api.js";
>>>>>>> 63934894cb8deacb8b52a9af7859bd4f459c8223

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

<<<<<<< HEAD
<<<<<<< HEAD
app.get("/api/player", getplayer);
app.get("api/match", Widget);
=======
=======
>>>>>>> 63934894cb8deacb8b52a9af7859bd4f459c8223
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
>>>>>>> 484f562 (API changes + cleaing function)

// Middleware
app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); // Allows the server to parse incoming JSON data in requests (e.g., req.body).