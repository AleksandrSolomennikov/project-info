import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const API_KEY = process.env.API_KEY;

export const getplayer = async (req, res) => {
  //const { id } = req.params;
  const URL = "https://v3.football.api-sports.io/players/squads";
  const config = {
    method: "GET",
    url: URL,
    params: { team: "33" },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
  };

  try {
    const response = await axios.get(URL, config);
    const data = response.data;
    const filePath = path.join(process.cwd(), "data", "data.json");
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Data written to file");
    res.json({message: "Data written to file", data});
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
};
