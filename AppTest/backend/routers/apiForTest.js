//for testing 
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { loadData } = require("../database/insertDataForTest.js");
const { db_basketball, db_football, db_formula1 } = require("../database/dbForTest.js");

dotenv.config();
const apiRouter = express.Router();

const API_KEY = process.env.API_KEY;

apiRouter.post('/create-request', async (req, res) => {

  const { field1, field2, inputText } = req.body;
  console.log('Received data:', { field1, field2, inputText });


  try {
    const data = await requestBuilder(field1, field2, inputText);
    const filePath = path.join(process.cwd(), "data", "data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    //res.send(data);

    // 🔸 Сохраняем параметры field1 и field2
    const metaPath = path.join(process.cwd(), "data", "meta.json");
    fs.writeFileSync(metaPath, JSON.stringify({ field1, field2 }, null, 2), "utf8");

  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).send("Failed to fetch stats");
  }

  loadData(field1, field2);

  return res.json({ status: 'ok' });
});


apiRouter.get('/get-data', (req, res) => {
  const metaPath = path.join(process.cwd(), "data", "meta.json");

  if (!fs.existsSync(metaPath)) {
    return res.status(400).json({ error: 'No saved request parameters' });
  }

  const { field1, field2 } = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

  let db;
  switch (field1) {
    case "formula 1":
      db = db_formula1;
      break;
    case "football":
      db = db_football;
      break;
    case "basketball":
      db = db_basketball;
      break;
    default: return res.status(400).json({ error: 'Unknown Database' });
  }

  const table = field2;

  const sql = `SELECT * FROM ${table}`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('error reading : ', err);
      return res.status(500).json({ error: 'Error reading from the database' });
    }
    res.json(rows);
  });

});

apiRouter.get('/api/clear', (req, res) => {
    clearData();
    res.status(200).send('Data cleared');
  });




const requestBuilder = async (sport, dataType, query) => {
  let url = "";
  let params = {};
  let host = "";
  switch (sport) {
    case "formula 1":
        url = `https://v1.formula-1.api-sports.io`;
        host = "v1.formula-1.api-sports.io";
        break;
    case "football":
        url = `https://v3.football.api-sports.io`;
        host = "v3.football.api-sports.io";
        break;
    case "basketball":
        url = `https://v1.basketball.api-sports.io`;
        host = "v1.basketball.api-sports.io";
        break;
  }

  switch (dataType) {
    case "players":
        if (sport === "formula 1") {
            url = `${url}/drivers`;
            params = { search: query };
            break;
        }
        if (sport === "basketball") {
            url = `${url}/players`;
            params = { search: query };
            break;
        }
        else {
            url = `${url}/players/profiles`;
            params = { search: query };
        }
      break;

    case "teams":
      url = `${url}/teams`;
      params = { search: query };
      break;

    case "seasons":
      if (sport === "formula 1" || sport === "basketball") {
        url = `${url}/seasons`;
        params = {};
        break;
      } 
      else {
        url = `${url}/leagues/seasons`;
        params = {};
      }
      break;

    case "competitions":
      if (sport === "formula 1") {
        url = `${url}/competitions`;
        params = { search: query };
        break;
      } 
      else {
        url = `${url}/leagues`;
        params = { search: query };
      }
      break;

    default:
      throw new Error("Invalid data type");
  }

  console.log("API URL:", url);
  console.log("API Params:", params);
  console.log("API Host:", host);

  const config = {
    method: "GET",
    url,
    params,
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": host,
    },
  };
  
  const response = await axios.request(config);
  return response.data;
};

module.exports = {
    requestBuilder, 
    apiRouter,
  };
