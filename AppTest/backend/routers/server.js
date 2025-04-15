

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import path from "path";
import apiRouter from "./api.js";
import fs from "fs"; 

//functions
/* import { loadData } from "../database/insertData.js";
import { clearData } from "../database/insertData.js";
import WidgetFootball from "../Controllers/widget.football.jsx";
import WidgetBasketballStandings from "../Controllers/widget.basketball.standings.jsx";
import WidgetBasketball from "../Controllers/widget.basketball.jsx";
import WidgetFootballStandings from "../Controllers/widget.football.standings.jsx";
import { requestBuilder } from "./api.js"; */

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

app.use(cors()); // Enables CORS, allowing frontend apps from different domains to access this backend.
app.use(express.json()); // Allows the server to parse incoming JSON data in requests (e.g., req.body).
app.use("/api", apiRouter); // Routes all requests starting with "/api" to the apiRouter.

//football widgets controllers
/*app.get("/widgets/football", WidgetFootball)
app.get("/widgets/football/standings", WidgetFootballStandings)


//basketball widgets controllers 
app.get("/widgets/basketball", WidgetBasketball )
app.get("/widgets/basketball/standings", WidgetBasketballStandings)*/



