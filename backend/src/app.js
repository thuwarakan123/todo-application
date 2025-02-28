const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const notFound = require('./middlewares/notFoundMiddleware');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
const baseUrl = '/api/v1'

app.use(cors());
app.use(bodyParser.json());


app.use(`${baseUrl}/auth`, authRoutes);
app.use(`${baseUrl}/task`, taskRoutes);

app.use(notFound)

module.exports = app;
