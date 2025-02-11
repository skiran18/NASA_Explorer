const axios = require('axios');
const config = require('../config');

const nasaClient = axios.create({
  baseURL: config.nasa.baseUrl,
  params: {
    api_key: config.nasa.apiKey
  }
});

class NasaApiService {
  async getAPOD() {
    const response = await nasaClient.get('/planetary/apod');
    return response.data;
  }

  async getMarsRoverPhotos(params) {
    const response = await nasaClient.get('/mars-photos/api/v1/rovers/curiosity/photos', {
      params
    });
    return response.data;
  }

  async getNearEarthObjects(params) {
    const response = await nasaClient.get('/neo/rest/v1/feed',{
      params
    });

    return response.data;
  }
}

module.exports = new NasaApiService();