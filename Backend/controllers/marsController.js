const nasaApi = require("../services/nasaApi");

class MarsController {
  async getMarsPictures(req, res, next) {
    try {
      const response = await nasaApi.getMarsRoverPhotos({ sol: "100" });
      console.log(response);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async filterCameraType(req, res, next) {
    try {
      const camera_filter = req.params.camType;
      const response = await nasaApi.getMarsRoverPhotos({
        "sol": "100",
        "camera" : camera_filter || "all",
      });
    //   console.log(response);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MarsController();
