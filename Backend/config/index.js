require('dotenv').config();

module.exports = {
  nasa: {
    apiKey: process.env.NASA_API_KEY,
    baseUrl: 'https://api.nasa.gov'
  },
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development'
};