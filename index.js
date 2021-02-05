/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

const $logger = require('./lib/server');
const logger = $logger.default;
logger.default = $logger.default;
module.exports = logger;
