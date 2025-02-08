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
}

module.exports = new NasaApiService();