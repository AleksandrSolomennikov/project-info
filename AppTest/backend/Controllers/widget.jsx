/*import React from "react";

const widget = () => { 
return ( 
    <div id="wg-api-football-games"
    s data-host="v3.football.api-sports.io"
     data-key="Your-Api-Key-Here"
     data-date=""
     data-league=""
     data-season=""
     data-theme=""
     data-refresh="15"
     data-show-toolbar="true"
     data-show-errors="false"
     data-show-logos="true"
     data-modal-game="true"
     data-modal-standings="true"
     data-modal-show-logos="true">
</div>
        <script
    type="module"
    src="https://widgets.api-sports.io/2.0.3/widgets.js">
        </script>
);
};

export default widget;*/

import React, { useEffect } from "react";

const Widget = () => {
  useEffect(() => {
    // Dynamically add the script once the component mounts
    const script = document.createElement("script");
    script.src = "https://widgets.api-sports.io/2.0.3/widgets.js";
    script.type = "module";
    document.body.appendChild(script);
  }, []); // Runs only once when component mounts

  return (
    <div
      id="wg-api-football-games"
      data-host="v3.football.api-sports.io"
      data-key="Your-Api-Key-Here"
      data-date=""
      data-league=""
      data-season=""
      data-theme=""
      data-refresh="15"
      data-show-toolbar="true"
      data-show-errors="false"
      data-show-logos="true"
      data-modal-game="true"
      data-modal-standings="true"
      data-modal-show-logos="true"
    ></div>
  );
};

export default Widget;
