const express = require('express');
// pull in configuration object
const appConfig = require('../index').appConfig();

const server = express();

// logger
const logger = require('../common/logger');

// add server middleware
require('./middleware/morgan')(server, logger);
require('./middleware/helmet')(server);
require('./middleware/bodyParser')(server);
require('./middleware/cors')(server);
require('./middleware/expressDevice')(server);

// build Routes
require('./utils/buildRoutes')(appConfig, server);

// Handle unspecified routes
server.use((req, res) =>
  res.status(404).json({
    error: `Unable to resolve ${req.originalUrl}`
  })
);

module.exports = server;
