import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";
import cors from '"';

dotenv.config();

const app = express();

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

/* const express = require("express"); // Sets up the Express web server.
const cors = require("cors"); //Enables Cross-Origin Resource Sharing (CORS), allowing API requests from different origins.
const axios = require("axios"); //HTTP client for making API requests (e.g., fetching data from an external API)
const path = require("path"); //Helps with file and directory paths
require("dotenv").config(); //Loads environment variables from a .env file (useful for API keys, database credentials, etc.).

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); //Allows the server to parse incoming JSON data in requests (e.g., req.body).*/
