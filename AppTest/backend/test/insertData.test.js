const fs = require("fs");
const { loadData, clearData } = require("../database/insertDataForTest.js");
const { db_football, db_basketball, db_formula1 } = require("../database/dbForTest.js");

jest.mock("fs");
jest.mock("../database/dbForTest.js", () => ({
  db_football: {
    serialize: jest.fn(),
    run: jest.fn(),
  },
  db_basketball: {
    serialize: jest.fn(),
    run: jest.fn(),
  },
  db_formula1: {
    serialize: jest.fn(),
    run: jest.fn(),
  },
}));

describe("loadData", () => {
  beforeEach(() => {
    fs.readFile.mockClear(); // Reset mock before each test
    db_football.run.mockClear();
    db_basketball.run.mockClear();
    db_formula1.run.mockClear();
  });

  it("should load football teams data and insert into the database", async () => {
    const mockJsonData = {
      response: [
        { team: { id: 1, name: "Team A", country: "Country A", founded: 1900, logo: "logo.png" } },
        { team: { id: 2, name: "Team B", country: "Country B", founded: 1920, logo: "logo2.png" } },
      ],
    };

    // Mock fs.readFile to return mock data
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify(mockJsonData));
    });
    await loadData("football", "teams");

    // Check if the database run method is called with the correct SQL query and parameters
    expect(db_football.run).toHaveBeenCalledWith(
      `INSERT INTO teams (id, name, country, founded, logo) VALUES (?, ?, ?, ?, ?)`,
      [1, "Team A", "Country A", 1900, "logo.png"]
    );
    expect(db_football.run).toHaveBeenCalledWith(
      `INSERT INTO teams (id, name, country, founded, logo) VALUES (?, ?, ?, ?, ?)`,
      [2, "Team B", "Country B", 1920, "logo2.png"]
    );
  });

  it("should handle errors when reading the file", async () => { // Mock error reading file
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(new Error("File read error"));
    });

    console.error = jest.fn(); 

    await loadData("football", "teams");
    expect(console.error).toHaveBeenCalledWith("❌ Error with reading JSON:", expect.any(Error));
  });

  it("should handle invalid sport type", async () => {
    const mockJsonData = { response: [] };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify(mockJsonData));
    });

    console.error = jest.fn();

    await loadData("invalidSport", "teams");

    expect(console.error).toHaveBeenCalledWith("❌ Invalid sport type:", "invalidSport");
  });

  it("should handle invalid data type", async () => {
    const mockJsonData = { response: [] };
    fs.readFile.mockImplementation((path, encoding, callback) => {
      callback(null, JSON.stringify(mockJsonData));
    });

    console.error = jest.fn();
    await loadData("football", "invalidDataType");

    expect(console.error).toHaveBeenCalledWith("❌ Invalid data type:", "invalidDataType");
  });
});

describe("clearData", () => {
  it("should clear all football data", () => {
    db_football.run.mockImplementationOnce((query, callback) => callback(null)); // Mock successful query execution
    db_football.all.mockImplementationOnce((query, callback) => callback(null, [{ name: "teams" }, { name: "players" }])); // Mock table names

    clearData();

    // Check if the queries to delete tables are called
    expect(db_football.run).toHaveBeenCalledWith('DROP TABLE IF EXISTS "teams";', expect.any(Function));
    expect(db_football.run).toHaveBeenCalledWith('DROP TABLE IF EXISTS "players";', expect.any(Function));
    expect(db_football.run).toHaveBeenCalledWith('VACUUM;', expect.any(Function));
  });

  it("should handle errors when dropping tables", () => {
    db_football.run.mockImplementationOnce((query, callback) => callback(new Error("DB error")));

    console.error = jest.fn();

    clearData();

    expect(console.error).toHaveBeenCalledWith('Table deleting error teams:', expect.any(Error));
  });
});
