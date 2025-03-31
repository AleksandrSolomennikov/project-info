const sqlite3 = await import("sqlite3");
const { Database } = sqlite3.default;

// Подключаемся к базе (файл будет создан, если его нет)
const db = new Database("database/football.db", (err) => {
  if (err) {
    console.error("Ошибка подключения к базе:", err.message);
  } else {
    console.log("📂 Подключено к базе данных SQLite");
  }
});

// Создаём таблицы, если их ещё нет
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,
      name TEXT,
      logo TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INTEGER,
      number INTEGER,
      position TEXT,
      photo TEXT,
      team_id INTEGER,
      FOREIGN KEY (team_id) REFERENCES teams (id)
    )
  `);
});

//module.exports = db; // Экспортируем подключение
export default db;
