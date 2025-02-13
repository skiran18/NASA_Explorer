const HomeController = require("../controllers/homeController");
const nasaApi = require("../services/nasaApi");

jest.mock("../services/nasaApi");

describe("HomeController", () => {
  
  test("getAPOD should return APOD data", async () => {
    const mockData = { title: "Astronomy Picture", url: "https://example.com/image.jpg" };
    nasaApi.getAPOD.mockResolvedValue(mockData);

    const req = {}; 
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await HomeController.getAPOD(req, res, next);

    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(next).not.toHaveBeenCalled();
  });

  test("getAPOD should handle errors correctly", async () => {
    const mockError = new Error("API Error");
    nasaApi.getAPOD.mockRejectedValue(mockError);

    const req = {}; 
    const res = {
      json: jest.fn(),
    };
    const next = jest.fn();

    await HomeController.getAPOD(req, res, next);

    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });

});
