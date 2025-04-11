
//for test purposes, I'll use the require functions, import statement won't work for some reasons.
const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const path = require("path");
const cors = require("cors");
const apiRouter = require("./apiForTest.js");
const fs = require("fs");
//functions
const { loadData } = require("../database/insertDataForTest.js");
const { clearData } = require("../database/insertDataForTest.js");
const { requestBuilder } = require("./apiForTest.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); // Allows the server to parse incoming JSON data in requests (e.g., req.body).
app.use("/api", apiRouter); // Routes all requests starting with "/api" to the apiRouter.