const request = require('supertest');
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const apiRouter = require('../routers/apiForTest.js'); 
const { loadData, clearData } = require('../database/insertDataForTest.js');
const { db_basketball, db_football, db_formula1 } = require('../database/dbForTest.js');


jest.mock('axios');
jest.mock('fs');
jest.mock('../database/insertDataForTest.js', () => ({
  loadData: jest.fn(),
  clearData: jest.fn(),
}));

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

describe("API Tests", () => {
  
  it("should call /create-request and return status 200", async () => {
    const mockRequest = {
      field1: "football",
      field2: "teams",
      inputText: "Liverpool",
    };

    // Mock axios response
    axios.request.mockResolvedValue({ data: { teams: [] } });

    const response = await request(app)
      .post('/api/create-request')
      .send(mockRequest);

    expect(response.status).toBe(200);
    expect(loadData).toHaveBeenCalledWith(mockRequest.field1, mockRequest.field2);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("should call /get-data and return status 200", async () => {
    const mockMeta = { field1: "football", field2: "teams" }; // fake meta data
    fs.readFileSync.mockReturnValueOnce(JSON.stringify(mockMeta));

    db_football.all = jest.fn().mockImplementation((sql, params, callback) => {
      callback(null, [{ teamName: "Liverpool" }]);
    });

    const response = await request(app).get('/api/get-data');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ teamName: "Liverpool" }]);
    expect(db_football.all).toHaveBeenCalled();
  });

  it("should handle errors on /get-data when meta.json does not exist", async () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error("File not found");
    });

    const response = await request(app).get('/api/get-data');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No saved request parameters');
  });

  it("should handle errors on /get-data when database query fails", async () => {
    const mockMeta = { field1: "football", field2: "teams" };

    fs.readFileSync.mockReturnValueOnce(JSON.stringify(mockMeta));

    db_football.all = jest.fn().mockImplementation((sql, params, callback) => {
      callback(new Error('Database error'));
    });

    const response = await request(app).get('/api/get-data');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Error reading from the database');
  });

  it("should handle errors in /create-request if requestBuilder fails", async () => {
    const mockRequest = {
      field1: "football",
      field2: "teams",
      inputText: "Liverpool",
    };

    axios.request.mockRejectedValue(new Error("API Error"));

    const response = await request(app)
      .post('/api/create-request')
      .send(mockRequest);

    expect(response.status).toBe(500);
    expect(response.text).toBe("Failed to fetch stats");
  });

});

