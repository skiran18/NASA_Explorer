const nasaApi = require("../services/nasaApi");

class NeoController {
  async getNEO(req, res, next) {
    try {
      const now = new Date();
      const todayDate = now.toISOString().split("T")[0];
      const response = await nasaApi.getNearEarthObjects({"end_date":todayDate});
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NeoController();
