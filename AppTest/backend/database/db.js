const sqlite3 = await import("sqlite3");
const { Database } = sqlite3.default;

const db_football = new Database("database/football.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("📂 Database connection is done, SQLite");
  }
});

db_football.serialize(() => {
  db_football.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,
      name TEXT,
      country TEXT,
      founded INTEGER,
      logo TEXT
    )
  `);

  db_football.run(`
    CREATE TABLE IF NOT EXISTS seasons (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `);

  db_football.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INTEGER,
      nationality TEXT,
      number INTEGER,
      position TEXT,
      photo TEXT
    )
  `);

  db_football.run(`
    CREATE TABLE IF NOT EXISTS competitions (
      id INTEGER PRIMARY KEY,
      name TEXT,
      type TEXT,
      logo TEXT,
      country TEXT
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


db_basketball.serialize(() => {
  db_basketball.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,
      name TEXT,
      country TEXT,
      logo TEXT
    )
  `);

  db_basketball.run(`
    CREATE TABLE IF NOT EXISTS seasons (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `);

  db_basketball.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,
      name TEXT,
      age INTEGER,
      country TEXT,
      number INTEGER,
      position TEXT
    )
  `);

  db_basketball.run(`
    CREATE TABLE IF NOT EXISTS competitions (
      id INTEGER PRIMARY KEY,
      name TEXT,
      type TEXT,
      logo TEXT,
      country TEXT
    )
  `);
});



const db_formula1 = new Database("database/formula 1.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("📂 Database connection is done, SQLite");
  }
});

db_formula1.serialize(() => {
  db_formula1.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,
      name TEXT,
      base TEXT,
      world_championships INTEGER,
      president TEXT,
      logo TEXT
    )
  `);

  db_formula1.run(`
    CREATE TABLE IF NOT EXISTS seasons (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `);

  db_formula1.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,
      name TEXT,
      abbr TEXT,
      nationality TEXT,
      birthdate TEXT,
      birthplace TEXT,
      number INTEGER,
      image TEXT
    )
  `);

  db_formula1.run(`
    CREATE TABLE IF NOT EXISTS competitions (
      id INTEGER PRIMARY KEY,
      name TEXT,
      country TEXT,
      city TEXT
    )
  `);
});

export { db_football, db_basketball, db_formula1 };