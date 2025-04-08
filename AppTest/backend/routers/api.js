import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { loadData } from "../database/insertData.js";

dotenv.config();
const apiRouter = express.Router();

const API_KEY = process.env.API_KEY;

apiRouter.post('/create-request', async (req, res) => {

  const { field1, field2, inputText } = req.body;
  console.log('Получены данные:', { field1, field2, inputText });

  // Здесь можешь сохранить в базу или сделать обработку

  try {
    const data = await requestBuilder(field1, field2, inputText);
    const filePath = path.join(process.cwd(), "data", "data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    //res.send(data);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).send("Failed to fetch stats");
  }

  loadData(field1, field2);

  return res.json({ status: 'ok' });
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


apiRouter.get('/get-data', (req, res) => {
  // Здесь подключись к своей базе и достань данные
  const dummyData = [
    { id: 1, name: 'Данные A' },
    { id: 2, name: 'Данные B' },
  ];
  res.json(dummyData);
});












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
      params = { name: query };
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
        params = { name: query };
        break;
      } 
      else {
        url = `${url}/leagues`;
        params = { name: query };
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
