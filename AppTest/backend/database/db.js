const sqlite3 = await import("sqlite3");
const { Database } = sqlite3.default;

// Connecting to the database (file will be created if it doesn't exist)
const db = new Database("database/football.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("📂 Database connection is done, SQLite");
  }
});

// Creating tables if they don't exist
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

//module.exports = db; 
export default db;
