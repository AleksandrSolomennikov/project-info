import fs from "fs";
import db_football from "./db.js";
import db_basketball from "./db.js";
import { db_formula1 } from "./db.js";

export const loadData = () => {
  fs.readFile("data/data.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error with reading JSON:", err);
      return;
    }

    const jsonData = JSON.parse(data);
    const teamData = jsonData.response[0].team;
    const playersData = jsonData.response[0].players;

    db_football.serialize(() => {
      db_football.run("DELETE FROM teams;");
      db_football.run("DELETE FROM players;");

      // Inserting teams
      db_football.run(
        `INSERT INTO teams (id, name, logo) VALUES (?, ?, ?)`,
        [teamData.id, teamData.name, teamData.logo],
        function (err) {
          if (err) return console.error("Team insert error:", err);
          console.log(`✅ Team is inserted: ${teamData.name}`);
        }
      );

      // Inerting players
      playersData.forEach((player) => {
        db_football.run(
          `INSERT INTO players (id, name, age, number, position, photo, team_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
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



export const clearData = () => {
    db_football.serialize(() => {
        db_football.run('PRAGMA foreign_keys = OFF;');
        
        db_football.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
            if (err) {
                console.error('Listing tables error:', err.message);
                return;
            }
            
            tables.forEach((table) => {
                const tableName = table.name;
                db_football.run(`DROP TABLE IF EXISTS "${tableName}";`, (err) => {
                    if (err) {
                        console.error(`Table deleting error ${tableName}:`, err.message);
                    } else {
                        console.log(`Table ${tableName} is deleted.`);
                    }
                });
            });
        });
        
        db_football.run('VACUUM;', (err) => {
            if (err) {
                console.error('Executing error VACUUM:', err.message);
            } else {
                console.log('Database is cleaned.');
            }
        });
    });
}

