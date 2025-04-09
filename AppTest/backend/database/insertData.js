import fs from "fs";
import { db_football, db_basketball, db_formula1 } from "./db.js";

export const loadData = (sport, dataType) => {
  fs.readFile("data/data.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error with reading JSON:", err);
      return;
    }

    const jsonData = JSON.parse(data);

    switch (sport) {
      case "football":
        db_football.serialize(() => {
          db_football.run("DELETE FROM teams;");
          db_football.run("DELETE FROM players;");
          db_football.run("DELETE FROM seasons;");
          db_football.run("DELETE FROM competitions;");

          switch (dataType) {
            case "teams":
              jsonData.response.forEach((teamData) => {
                db_football.run(
                  `INSERT INTO teams (id, name, country, founded, logo) VALUES (?, ?, ?, ?, ?)`,
                  [teamData.team.id, teamData.team.name, teamData.team.country, teamData.team.founded, teamData.team.logo],
                  function (err) {
                    if (err) return console.error("Team insert error:", err);
                    console.log(`✅ Team is inserted: ${teamData.team.name}`);
                  }
                );
              });
              break;

            case "players":
              jsonData.response.forEach((playerData) => {
                db_football.run(
                  "INSERT INTO players (id, name, age, nationality, number, position, photo) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  [playerData.player.id, playerData.player.name, playerData.player.age, playerData.player.nationality, playerData.player.number, playerData.player.position, playerData.player.photo],
                  function (err) {
                    if (err) return console.error("Player insert error:", err);
                    console.log(`✅ Player is inserted: ${playerData.player.name}`);
                  }
                );
              });
              break;

            case "seasons":
              jsonData.response.forEach((season, i) => {
                db_football.run(
                  `INSERT INTO seasons (id, name) VALUES (?, ?)`,
                  [i, season],
                  function (err) {
                    if (err) return console.error("Season insert error:", err);
                    console.log(`✅ Season is inserted: ${season}`);
                  }
                );
              });
              break;

            case "competitions":
              jsonData.response.forEach((competition) => {
                const leagueData = competition.league;
                const countryData = competition.country;
                db_football.run(
                  `INSERT INTO competitions (id, name, type, logo, country) VALUES (?, ?, ?, ?, ?)`,
                  [leagueData.id, leagueData.name, leagueData.type, leagueData.logo, countryData.name],
                  function (err) {
                    if (err) return console.error("Competition insert error:", err);
                    console.log(`✅ Competition is inserted: ${leagueData.name}`);
                  }
                );
              });
              break;

            default:
              console.error("❌ Invalid data type:", dataType);
              return;
          }
        });
        break;

      case "basketball":
        db_basketball.serialize(() => {
          db_basketball.run("DELETE FROM teams;");
          db_basketball.run("DELETE FROM players;");
          db_basketball.run("DELETE FROM seasons;");
          db_basketball.run("DELETE FROM competitions;");

          switch (dataType) {
            case "teams":
              jsonData.response.forEach((teamData) => {
                db_basketball.run(
                  `INSERT INTO teams (id, name, country, logo) VALUES (?, ?, ?, ?)`,
                  [teamData.id, teamData.name, teamData.country.name, teamData.logo],
                  function (err) {
                    if (err) return console.error("Team insert error:", err);
                    console.log(`✅ Team is inserted: ${teamData.name}`);
                  }
                );
              });
              break;

            case "players":
              jsonData.response.forEach((playerData) => {
                db_basketball.run(
                  "INSERT INTO players (id, name, age, country, number, position) VALUES (?, ?, ?, ?, ?, ?)",
                  [playerData.id, playerData.name, playerData.age, playerData.country, playerData.number, playerData.position],
                  function (err) {
                    if (err) return console.error("Player insert error:", err);
                    console.log(`✅ Player is inserted: ${playerData.name}`);
                  }
                );
              });
              break;

            case "seasons":
              jsonData.response.forEach((season, i) => {
                db_basketball.run(
                  `INSERT INTO seasons (id, name) VALUES (?, ?)`,
                  [i, season],
                  function (err) {
                    if (err) return console.error("Season insert error:", err);
                    console.log(`✅ Season is inserted: ${season}`);
                  }
                );
              });
              break;

            case "competitions":
              jsonData.response.forEach((competition) => {
                db_basketball.run(
                  `INSERT INTO competitions (id, name, type, logo, country) VALUES (?, ?, ?, ?, ?)`,
                  [competition.id, competition.name, competition.type, competition.logo, competition.country.name],
                  function (err) {
                    if (err) return console.error("Competition insert error:", err);
                    console.log(`✅ Competition is inserted: ${competition.name}`);
                  }
                );
              });
              break;

            default:
              console.error("❌ Invalid data type:", dataType);
              return;
          }
        });
        break;

      case "formula 1":
        db_formula1.serialize(() => {
          db_formula1.run("DELETE FROM teams;");
          db_formula1.run("DELETE FROM players;");
          db_formula1.run("DELETE FROM seasons;");
          db_formula1.run("DELETE FROM competitions;");

          switch (dataType) {
            case "teams":
              jsonData.response.forEach((teamData) => {
                db_formula1.run(
                  `INSERT INTO teams (id, name, base, world_championships, president, logo) VALUES (?, ?, ?, ?, ?, ?)`,
                  [teamData.id, teamData.name, teamData.base, teamData.world_championships, teamData.president, teamData.logo],
                  function (err) {
                    if (err) return console.error("Team insert error:", err);
                    console.log(`✅ Team is inserted: ${teamData.name}`);
                  }
                );
              });
              break;

            case "players":
              jsonData.response.forEach((playerData) => {
                db_formula1.run(
                  "INSERT INTO players (id, name, abbr, nationality, birthdate, birthplace, number, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                  [playerData.id, playerData.name, playerData.abbr, playerData.nationality, playerData.birthdate, playerData.birthplace, playerData.number, playerData.image],
                  function (err) {
                    if (err) return console.error("Player insert error:", err);
                    console.log(`✅ Player is inserted: ${playerData.name}`);
                  }
                );
              });
              break;

            case "seasons":
              jsonData.response.forEach((season, i) => {
                db_formula1.run(
                  `INSERT INTO seasons (id, name) VALUES (?, ?)`,
                  [i, season],
                  function (err) {
                    if (err) return console.error("Season insert error:", err);
                    console.log(`✅ Season is inserted: ${season}`);
                  }
                );
              });
              break;

            case "competitions":
              jsonData.response.forEach((competition) => {
                db_formula1.run(
                  `INSERT INTO competitions (id, name, country, city) VALUES (?, ?, ?, ?)`,
                  [competition.id, competition.name, competition.location.country, competition.location.city],
                  function (err) {
                    if (err) return console.error("Competition insert error:", err);
                    console.log(`✅ Competition is inserted: ${competition.name}`);
                  }
                );
              });
              break;

            default:
              console.error("❌ Invalid data type:", dataType);
              return;
          }
        });
        break;

      default:
        console.error("❌ Invalid sport type:", sport);
        return;
    }
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

