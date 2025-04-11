const request = require('supertest');
const express = require('express');
const cors = require('cors');
const { apiRouter }= require('../routers/apiForTest.js');

// Mock the loadData and clearData functions
jest.mock('../database/insertDataForTest.js', () => ({
  loadData: jest.fn(),
  clearData: jest.fn(),
}));

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use("/api", apiRouter);

describe("API Server", () => {

  it("should respond to /api/clear route and call clearData", async () => {
    const response = await request(app).get('/api/clear');
    expect(response.status).toBe(200);
    expect(require('../database/insertDataForTest.js').clearData).toHaveBeenCalled();
  });
});
