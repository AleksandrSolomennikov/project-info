import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

export const getTeamStats = async (req, res) => {
  const URL = "https://v1.basketball.api-sports.io/statistics";
  const config = {
    method: "GET",
    url: URL,
    params: { season: "2022-2023", team: "139", league: "12" },
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": "v1.basketball.api-sports.io",
    },
  };

  try {
    const response = await axios.get(URL, config);
    res.json(response.data);
  } catch (error) {
    console.log("error fetching team data", error);
    res.statuts(500).json({ error: "failed to fetch team statistics" });
  }
};
