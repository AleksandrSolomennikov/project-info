import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import cors from "cors";

//functions
import { getplayer } from "../Controllers/match.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

app.get("/api/player", getplayer);
app.get("api/match");

// Middleware
app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); //Allows the server to parse incoming JSON data in requests (e.g., req.body).*/
