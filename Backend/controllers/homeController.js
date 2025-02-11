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

  async getRandomSpaceFact() {
    const facts = [
      "The Sun contains 99.86% of the mass in the Solar System",
      "There are more trees on Earth than stars in the Milky Way",
      "The footprints on the Moon will last for 100 million years"
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  }
}

module.exports = new HomeController();