import React, { useEffect } from "react";
import dotenv from "dotenv"; 

dotenv.config()
const API_KEY = process.env.API_KEY; 

const WidgetFootballStandings = () => {
  useEffect(() => {
    // Dynamically add the script once the component mounts
    const script = document.createElement("script");
    script.src = "https://widgets.api-sports.io/2.0.3/widgets.js";
    script.type = "module";
    document.body.appendChild(script);
  }, []); // Runs only once when component mounts

  return (
    <div id="wg-api-football-standings"
    data-host="v3.football.api-sports.io"
    data-key={API_KEY}
    data-league="39"
    data-team=""
    data-season="2021"
    data-theme=""
    data-show-errors="false"
    data-show-logos="true"
    class="wg_loader">
    </div>
  );
};

export default WidgetFootballStandings;
