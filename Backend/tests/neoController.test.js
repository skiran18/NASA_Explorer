const NeoController = require("../controllers/neoController");
const nasaApi = require("../services/nasaApi");

jest.mock("../services/nasaApi");

describe("NeoController", () => {
  
  let originalDate;

  beforeAll(() => {
    originalDate = global.Date;
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  test("getNEO should return Near-Earth Objects data", async () => {
    const mockDate = "2024-02-13";
    global.Date = class extends Date {
      constructor() {
        return new originalDate(mockDate);
      }
    };

    const mockData = { near_earth_objects: {mockDate:[{}]}};
    nasaApi.getNearEarthObjects.mockResolvedValue(mockData);
    const req = {}; 
    const res = { json: jest.fn() };
    const next = jest.fn();

    await NeoController.getNEO(req, res, next);

    expect(nasaApi.getNearEarthObjects).toHaveBeenCalledWith({ end_date: mockDate });
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(next).not.toHaveBeenCalled();
  });

  test("getNEO should handle errors correctly", async () => {
    const mockError = new Error("API Error");
    nasaApi.getNearEarthObjects.mockRejectedValue(mockError);

    const req = {}; 
    const res = { json: jest.fn() };
    const next = jest.fn();

    await NeoController.getNEO(req, res, next);

    expect(next).toHaveBeenCalledWith(mockError);
  });

});
