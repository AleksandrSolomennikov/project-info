

import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import cors from "cors";
import apiRouter from "./api.js";
import fs from "fs";

//functions
import { loadData } from "../database/insertData.js";
import { clearData } from "../database/insertData.js";
import { requestBuilder } from "./api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); // Allows the server to parse incoming JSON data in requests (e.g., req.body).
app.use("/api", apiRouter); // Routes all requests starting with "/api" to the apiRouter.


