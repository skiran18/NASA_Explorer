const express = require("express");
const app = express();
const cors = require('cors');
const homeRouter = require('./routes/home')

app.use(cors());
app.use(express.json());

app.use('/api/apod', homeRouter);

module.exports = app;