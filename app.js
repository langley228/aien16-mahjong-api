const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const cors = require('cors');
const app = express();
const corsConfig = require('./config/di').corsConfig;
const corsOptions = corsConfig;

app.use(cors(corsOptions));
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", require('./routes/tile')); // api router

// swagger設定檔案
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;
