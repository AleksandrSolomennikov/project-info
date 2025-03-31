import fs from "fs";
import db from "./db.js";

export const loadData = () => {
  fs.readFile("data/data.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Ошибка чтения JSON:", err);
      return;
    }

    const jsonData = JSON.parse(data);
    const teamData = jsonData.response[0].team;
    const playersData = jsonData.response[0].players;

    db.serialize(() => {
      db.run("DELETE FROM teams;");
      db.run("DELETE FROM players;");

      // Вставляем команду
      db.run(
        `INSERT INTO teams (id, name, logo) VALUES (?, ?, ?)`,
        [teamData.id, teamData.name, teamData.logo],
        function (err) {
          if (err) return console.error("Ошибка вставки команды:", err);
          console.log(`✅ Команда добавлена: ${teamData.name}`);
        }
      );

      // Вставляем игроков
      playersData.forEach((player) => {
        db.run(
          `INSERT INTO players (id, name, age, number, position, photo, team_id) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [player.id, player.name, player.age, player.number, player.position, player.photo, teamData.id],
          (err) => {
            if (err) return console.error("Ошибка вставки игрока:", err);
            console.log(`✅ Добавлен игрок: ${player.name}`);
          }
        );
      });
    });
  });
};

