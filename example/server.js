const $logger = require('../lib/server').default;

const logger = new $logger();

logger.log('log');
logger.info('info');
logger.debug('debug');
logger.warn('warn');
logger.error('error');
logger.success('success');
logger.fail('fail');
logger.tip('tip');
logger.stress('stress');
