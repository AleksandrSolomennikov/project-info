import React, {useEffect} from "react";
import dotenv from "dotenv"; 

dotenv.config()

const API_KEY = process.env.API_KEY; 

const WidgetBasketballStandings = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://widgets.api-sports.io/2.0.3/widgets.js"; 
        script.type = "module"; 
        document.body.appendChild(script);
    }, []); 


    return (
    <div 
        id="wg-api-basketball-standings"
        data-host="v1.basketball.api-sports.io"
        data-key={API_KEY}
        data-league="12"
        data-season="2021-2022"
        data-theme=""
        data-show-errors="false"
        data-show-logos="true"
        class="wg_loader">
    </div>

    );
};


export default WidgetBasketballStandings; 

