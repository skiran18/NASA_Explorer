const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger')

const nasaClient = axios.create({
  baseURL: config.nasa.baseUrl,
  params: {
    api_key: config.nasa.apiKey
  }
});

class NasaApiService {
  async getAPOD() {
    const response = await nasaClient.get('/planetary/apod');
    // logger.info(response.data);
    return response.data;
  }

  async getMarsRoverPhotos(params) {
    const response = await nasaClient.get('/mars-photos/api/v1/rovers/curiosity/photos', {
      params
    });
    // logger.info(response.data);
    return response.data;
  }

  async getNearEarthObjects(params) {
    const response = await nasaClient.get('/neo/rest/v1/feed',{
      params
    });
    // logger.info(response.data);
    return response.data;
  }
}

module.exports = new NasaApiService();