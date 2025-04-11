import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { loadData } from "../database/insertData.js";
import { db_basketball, db_football, db_formula1 } from "../database/db.js";

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
    return res.status(400).json({ error: 'No saved request parametres' });
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
    default: return res.status(400).json({ error: 'Unknown base' });
  }

  const table = field2;

  const sql = `SELECT * FROM ${table}`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Reading error:', err);
      return res.status(500).json({ error: 'Error during reading the base' });
    }
    res.json(rows);
  });

});



/*apiRouter.get("/fetch-data", async (req, res) => {
  const { sport, dataType, query } = req.query;


  try {
    const data = await requestBuilder(sport, dataType, query);
    const filePath = path.join(process.cwd(), "data", "data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    res.json({ message: "Data written to file", data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});*/














export const requestBuilder = async (sport, dataType, query) => {
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

export default apiRouter;
