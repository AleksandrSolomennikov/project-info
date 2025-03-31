import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import cors from "cors";
import { loadData } from "../database/insertData.js" ;

//functions
import { getplayer } from "../Controllers/match.controller.js";
import Widget from "../Controllers/widget.jsx";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

app.get("/update-db", (req, res) => {
  loadData();
  res.send("🔄 Database is being updated, see the logs in console!");
});

app.get("/api/player", getplayer);
app.get("api/match", Widget);

// Middleware
app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); //Allows the server to parse incoming JSON data in requests (e.g., req.body).*/
