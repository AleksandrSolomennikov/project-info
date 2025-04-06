const dotenv = require("dotenv");

dotenv.config();

jest.mock("axios"); // Mock axios to avoid making real API calls

describe("getplayer", () => {
  const mockRequest = {};
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("should fetch player data and return it as JSON", async () => {
    // Mock the axios response
    const mockData = { data: { players: ["Player1", "Player2"] } };
    axios.get.mockResolvedValueOnce(mockData);

    await getplayer(mockRequest, mockResponse);

    expect(axios.get).toHaveBeenCalledWith(
      "https://v3.football.api-sports.io/players/squads",
      {
        method: "GET",
        url: "https://v3.football.api-sports.io/players/squads",
        params: { team: "33" },
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": "v1.football.api-sports.io",
        },
      }
    );
    expect(mockResponse.json).toHaveBeenCalledWith(mockData.data);
  });
});
