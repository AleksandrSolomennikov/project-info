const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to fetch match results
app.get("/api/matches", async (req, res) => {
  try {
    // Replace with your actual API endpoint
    const response = await axios.get(
      "https://api.football-data.org/v2/matches",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching match data:", error);
    res
      .status(500)
      .json({ message: "Error fetching match data", error: error.message });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
