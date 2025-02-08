import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = 3000;
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

app.use(cors());
app.use(express.json());

// APOD endpoint
app.get('/api/v1/apod', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

// Mars Rover Photos endpoint
app.get('/api/v1/mars-photos', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Mars photos' });
  }
});

// NEO (Near Earth Objects) endpoint
app.get('/api/v1/neo', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed/today?api_key=${NASA_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch NEO data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});