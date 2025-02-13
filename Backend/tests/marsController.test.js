const MarsController = require("../controllers/marsController");
const nasaApi = require("../services/nasaApi");

jest.mock("../services/nasaApi");

describe("MarsController", () => {
  
  test("getMarsPictures should return Mars Rover photos", async () => {

    const mockData = { photos: [{ id: 1, img_src: "https://example.com/mars.jpg" }] };
    nasaApi.getMarsRoverPhotos.mockResolvedValue(mockData);

    const req = {}; 
    const res = { json: jest.fn() };
    const next = jest.fn();

    await MarsController.getMarsPictures(req, res, next);

    expect(nasaApi.getMarsRoverPhotos).toHaveBeenCalledWith({ sol: "100" });
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(next).not.toHaveBeenCalled();
  });

  test("getMarsPictures should handle errors correctly", async () => {
    const mockError = new Error("API Error");
    nasaApi.getMarsRoverPhotos.mockRejectedValue(mockError);

    const req = {}; 
    const res = { json: jest.fn() };
    const next = jest.fn();

    await MarsController.getMarsPictures(req, res, next);

    expect(next).toHaveBeenCalledWith(mockError);
  });

  test("filterCameraType should return filtered Mars Rover photos", async () => {
    const mockData = { photos: [{ id: 2, camera: "FHAZ", img_src: "https://example.com/fhaz.jpg" }] };
    nasaApi.getMarsRoverPhotos.mockResolvedValue(mockData);

    const req = { params: { camType: "FHAZ" } };
    const res = { json: jest.fn() };
    const next = jest.fn();

    await MarsController.filterCameraType(req, res, next);

    expect(nasaApi.getMarsRoverPhotos).toHaveBeenCalledWith({ sol: "100", camera: "FHAZ" });
    expect(res.json).toHaveBeenCalledWith(mockData);
    expect(next).not.toHaveBeenCalled();
  });

  test("filterCameraType should handle errors correctly", async () => {
    const mockError = new Error("API Error");
    nasaApi.getMarsRoverPhotos.mockRejectedValue(mockError);

    const req = { params: { camType: "NAVCAM" } };
    const res = { json: jest.fn() };
    const next = jest.fn();

    await MarsController.filterCameraType(req, res, next);

    expect(next).toHaveBeenCalledWith(mockError);
  });

});
