import express from "express";
import axios from "axios";
import dotenv from "dotenv";

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
      "x-rapidapi-host": "v1.football.api-sports.io",
    },
  };

  try {
    const response = await axios.get(URL, config);
    //console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
};
