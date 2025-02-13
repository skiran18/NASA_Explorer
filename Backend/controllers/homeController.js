const nasaApi = require('../services/nasaApi');

class HomeController {
  async getAPOD(req, res, next) {
    try {
      const response = await nasaApi.getAPOD();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HomeController();