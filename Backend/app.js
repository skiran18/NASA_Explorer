const express = require("express");
const app = express();
const cors = require('cors');
const homeRouter = require('./routes/home')
const marsRouter = require('./routes/mars')
const neoRouter = require('./routes/neo')
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');


app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/apod', homeRouter);
app.use('/api/mars', marsRouter);
app.use('/api/neo', neoRouter);

app.use(errorHandler);

module.exports = app;