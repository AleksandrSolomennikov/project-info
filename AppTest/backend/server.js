const express = require("express"); // Sets up the Express web server.
const cors = require("cors"); //Enables Cross-Origin Resource Sharing (CORS), allowing API requests from different origins.
const axios = require("axios"); //HTTP client for making API requests (e.g., fetching data from an external API)
const path = require("path"); //Helps with file and directory paths
require("dotenv").config(); //Loads environment variables from a .env file (useful for API keys, database credentials, etc.).

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); //Allows the server to parse incoming JSON data in requests (e.g., req.body).

// API endpoint to fetch match results
app.get("/api/matches", async (req, res) => {
  try {
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

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
