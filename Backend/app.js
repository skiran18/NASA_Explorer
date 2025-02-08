const express = require("express");
const app = express();
const cors = require('cors');
const homeRouter = require('./routes/home')
const marsRouter = require('./routes/mars')

app.use(cors());
app.use(express.json());

app.use('/api/apod', homeRouter);
app.use('/api/mars', marsRouter);

module.exports = app;