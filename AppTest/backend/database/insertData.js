import fs from "fs";
import db from "./db.js";

export const loadData = () => {
  fs.readFile("data/data.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error with reading JSON:", err);
      return;
    }

    const jsonData = JSON.parse(data);
    const teamData = jsonData.response[0].team;
    const playersData = jsonData.response[0].players;

    db.serialize(() => {
      db.run("DELETE FROM teams;");
      db.run("DELETE FROM players;");

      // Inserting teams
      db.run(
        `INSERT INTO teams (id, name, logo) VALUES (?, ?, ?)`,
        [teamData.id, teamData.name, teamData.logo],
        function (err) {
          if (err) return console.error("Team insert error:", err);
          console.log(`✅ Team is inserted: ${teamData.name}`);
        }
      );

      // Inerting players
      playersData.forEach((player) => {
        db.run(
          `INSERT INTO players (id, name, age, number, position, photo, team_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [player.id, player.name, player.age, player.number, player.position, player.photo, teamData.id],
          (err) => {
            if (err) return console.error("Player insert error:", err);
            console.log(`✅ Player is inserted: ${player.name}`);
          }
        );
      });
    });
  });
};

