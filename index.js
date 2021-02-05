/* eslint-disable */

const $logger = require('./lib/server');

const logger = $logger.default;
logger.default = $logger.default;
module.exports = logger;
