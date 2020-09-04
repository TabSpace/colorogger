# colorogger

![action-release](https://github.com/TabSpace/colorogger/workflows/release/badge.svg)

A simple colorful logger. Both for browser and node-server. Easy to report and record.

## Demo

### server demo

![server demo](https://raw.githubusercontent.com/TabSpace/colorogger/master/example/server.jpg)

### browser demo

![browser demo](https://raw.githubusercontent.com/TabSpace/colorogger/master/example/client.jpg)

## Getting Started

### install

```bash
npm i colorogger
```

### server

```js
const colorogger = require('colorogger');
const logger = new colorogger();

logger.log('log');
logger.info('info');
logger.debug('debug');
logger.warn('warn');
logger.error('error');
logger.success('success');
logger.fail('fail');
logger.tip('tip');
logger.stress('stress');
```

### browser (with webpack)

```js
const colorogger = require('colorogger/lib/client');
const logger = new colorogger();
logger.success('message');
```
