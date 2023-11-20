const $logger = require('../lib/server').default;

const logger = new $logger();

logger.debug('0: debug');
logger.log('1: log');
logger.tip('1: tip');
logger.info('2: info');
logger.success('2: success');
logger.warn('3: warn');
logger.stress('3: stress');
logger.error('4: error');
logger.fail('4: fail');
