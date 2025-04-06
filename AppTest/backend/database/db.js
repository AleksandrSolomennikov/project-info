const sqlite3 = await import("sqlite3");
const { Database } = sqlite3.default;

// Connecting to the database (file will be created if it doesn't exist)
const db_football = new Database("database/football.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("📂 Database connection is done, SQLite");
  }
});

// Creating tables if they don't exist
db_football.serialize(() => {
  db_football.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,
      name TEXT,
      logo TEXT
    )
  `);

  db_football.run(`
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

const db_basketball = new Database("database/basketball.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("📂 Database connection is done, SQLite");
  }
});

// Creating tables if they don't exist
db_basketball.serialize(() => {
  db_basketball.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,
      name TEXT,
      logo TEXT
    )
  `);

  db_basketball.run(`
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


const db_formula1 = new Database("database/formula 1.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("📂 Database connection is done, SQLite");
  }
});

// Creating tables if they don't exist
db_formula1.serialize(() => {
  db_formula1.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,
      name TEXT,
      logo TEXT
    )
  `);

  db_formula1.run(`
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
export { db_football, db_basketball, db_formula1 };