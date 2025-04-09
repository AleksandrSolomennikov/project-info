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
              const teamData = jsonData.response[0].team;
              db_football.run(
                `INSERT INTO teams (id, name, country, founded, logo) VALUES (?, ?, ?, ?, ?)`,
                [teamData.id, teamData.name, teamData.country, teamData.founded, teamData.logo],
                function (err) {
                  if (err) return console.error("Team insert error:", err);
                  console.log(`✅ Team is inserted: ${teamData.name}`);
                }
              );
              break;

            case "players":
              const playerData = jsonData.response[0].player; 
              db_football.run(
                "INSERT INTO players (id, name, age, nationality, number, position, photo) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [playerData.id, playerData.name, playerData.age, playerData.nationality, playerData.number, playerData.position, playerData.photo],
                function (err) {
                  if (err) return console.error("Player insert error:", err);
                  console.log(`✅ Player is inserted: ${playerData.name}`);
                }
              );
              break;

            case "seasons":
              const seasonData = jsonData.response;
              let i = 0;
              seasonData.forEach((season) => {
                db_football.run(
                  `INSERT INTO seasons (id, name) VALUES (?, ?)`,
                  [i, season],
                  function (err) {
                    if (err) return console.error("Season insert error:", err);
                    console.log(`✅ Season is inserted: ${season}`);
                  }
                );
                i++;
              });
              break;

            case "competitions":
              const leagueData = jsonData.response[0].league;
              const countryData = jsonData.response[0].country;
              db_football.run(
                `INSERT INTO competitions (id, name, type, logo, country) VALUES (?, ?, ?, ?, ?)`,
                [leagueData.id, leagueData.name, leagueData.type, leagueData.logo, countryData.name],
                function (err) {
                  if (err) return console.error("Competition insert error:", err);
                  console.log(`✅ Competition is inserted: ${leagueData.name}`);
                }
              );
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
              const idData = jsonData.response[0].id;
              const nameData = jsonData.response[0].name;
              const logoData = jsonData.response[0].logo;
              const countryData = jsonData.response[0].country;
              db_basketball.run(
                `INSERT INTO teams (id, name, country, logo) VALUES (?, ?, ?, ?)`,
                [idData, nameData, countryData.name, logoData],
                function (err) {
                  if (err) return console.error("Team insert error:", err);
                  console.log(`✅ Team is inserted: ${nameData}`);
                }
              );
              break;
    
            case "players":
              const YAidData = jsonData.response[0].id;
              const YAnameData = jsonData.response[0].name;
              const ageData = jsonData.response[0].age; 
              const YAcountryData = jsonData.response[0].country; 
              const numberData = jsonData.response[0].number;
              const positionData = jsonData.response[0].position;
              db_basketball.run(
                "INSERT INTO players (id, name, age, country, number, position) VALUES (?, ?, ?, ?, ?, ?)",
                [YAidData, YAnameData, ageData, YAcountryData, numberData, positionData],
                function (err) {
                  if (err) return console.error("Player insert error:", err);
                  console.log(`✅ Player is inserted: ${YAnameData}`);
                }
              );
              break;

            case "seasons":
              const seasonData = jsonData.response;
              let i = 0;
              seasonData.forEach((season) => {
                if (typeof season === "string") {
                  console.log("i: ", i);
                  db_basketball.run(
                    `INSERT INTO seasons (id, name) VALUES (?, ?)`,
                    [i, season],
                    function (err) {
                      if (err) return console.error("Season insert error:", err);
                      console.log(`✅ Season is inserted: ${season}`);
                    }
                  );
                  i++;
                }
              });
              break;

            case "competitions":
              jsonData.response.forEach((competition) => {
                const YYAidData = competition.id;
                const YYAnameData = competition.name;
                const typeData = competition.type;
                const logoData = competition.logo;
                const YAcountryData = competition.country;
                db_basketball.run(
                  `INSERT INTO competitions (id, name, type, logo, country) VALUES (?, ?, ?, ?, ?)`,
                  [YYAidData, YYAnameData, typeData, logoData, YAcountryData.name],
                  function (err) {
                    if (err) return console.error("Competition insert error:", err);
                    console.log(`✅ Competition is inserted: ${YYAnameData}`);
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
              const YAidData = jsonData.response[0].id;
              const YAnameData = jsonData.response[0].name;
              const baseData = jsonData.response[0].base;
              const championshipsData = jsonData.response[0].world_championships;
              const logoData = jsonData.response[0].logo;
              const presidentData = jsonData.response[0].president;
              db_formula1.run(
                `INSERT INTO teams (id, name, base, world_championships, president, logo) VALUES (?, ?, ?, ?, ?, ?)`,
                [YAidData, YAnameData, baseData, championshipsData, logoData, presidentData],
                function (err) {
                  if (err) return console.error("Team insert error:", err);
                  console.log(`✅ Team is inserted: ${YAnameData}`);
                }
              );
              break;
            case "players":
              const YYAidData = jsonData.response[0].id;
              const YYAnameData = jsonData.response[0].name;
              const abbrData = jsonData.response[0].abbr;
              const nationalityData = jsonData.response[0].nationality;
              const numberData = jsonData.response[0].number;
              const birthdateData = jsonData.response[0].birthdate;
              const birthplaceData = jsonData.response[0].birthplace;
              const imageData = jsonData.response[0].image;
              db_formula1.run(
                "INSERT INTO players (id, name, abbr, nationality, birthdate, birthplace, number, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [YYAidData, YYAnameData, abbrData, nationalityData, birthdateData, birthplaceData, numberData, imageData],
                function (err) {
                  if (err) return console.error("Player insert error:", err);
                  console.log(`✅ Player is inserted: ${YYAnameData}`);
                }
              );
              break;
            case "seasons":
              const seasonData = jsonData.response;
                let i = 0;
                seasonData.forEach((season) => {
                  db_football.run(
                    `INSERT INTO seasons (id, name) VALUES (?, ?)`,
                    [i, season],
                    function (err) {
                      if (err) return console.error("Season insert error:", err);
                      console.log(`✅ Season is inserted: ${season}`);
                    }
                  );
                  i++;
                });
              break;

            case "competitions":
              const idData = jsonData.response[0].id;
              const nameData = jsonData.response[0].name;
              const locationData = jsonData.response[0].location;
              db_formula1.run(
                `INSERT INTO competitions (id, name, country, city) VALUES (?, ?, ?, ?)`,
                [idData, nameData, locationData.country, locationData.city],
                function (err) {
                  if (err) return console.error("Competition insert error:", err);
                  console.log(`✅ Competition is inserted: ${nameData}`);
                }
              );
              break;
            default:
              console.error("❌ Invalid data type:", dataType);
              return;
          }
        });
        break;
      /*default:
        console.error("❌ Invalid sport type:", sport);
        return;*/
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

