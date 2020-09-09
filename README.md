# colorogger

![npm](https://img.shields.io/npm/v/colorogger)
![npm](https://img.shields.io/npm/dm/colorogger.svg)
![NPM](https://img.shields.io/npm/l/colorogger)
![GitHub top language](https://img.shields.io/github/languages/top/TabSpace/colorogger)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![action-release](https://github.com/TabSpace/colorogger/workflows/release/badge.svg)
[![codecov](https://codecov.io/gh/TabSpace/colorogger/branch/master/graph/badge.svg)](https://codecov.io/gh/TabSpace/colorogger)
[![Package Quality](https://npm.packagequality.com/shield/colorogger.svg)](https://packagequality.com/#?package=colorogger)

A simple colorful logger. Both for browser and node-server. Easy to report and record.

[releases and changelog](https://github.com/TabSpace/colorogger/releases)

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

## Options

### color

Enable colored log.

- type: `Boolean`
- default: `true`

### timeStamp

Enable time stamp.

- type: `Boolean`
- default: `true`

### print

Enable logger print log to console.

- type: `Boolean`
- default: `true`

### timeTemplate

Format time stamp.

- type: `String`
- default: `'{{YYYY}}/{{MM}}/{{DD}} {{hh}}:{{mm}}:{{ss}}.{{mss}}'`

### wrapIcon

Format icon log text.

- type: `Function`
- default: `(icon) => \`[${icon}]\``

### wrapTag

Format meta key log text.

- type: `Function`
- default: `(tag, key) => \`[${tag}]\``

### meta

Extra log info.

- type: `Object`
- default: `undefined`

Example:

```js
const logger = new colorogger({
  timeStamp: false,
  meta: {
    guid: 'guid_abc'
  }
});

logger.log('log text');
// console output: [.] [guid_abc] log text
```

### transport

Resive message object.

- type: `Function`
- default: `null`

Example:

```js
const logger = new colorogger({
  meta: {
    guid: 'guid_123',
  },
  transport(msg) {
    console.log(msg);
  }
});

logger.success('log text');
// msg.content: ['log text']
// msg.flag: 'success'
// msg.grade: 1
// msg.guid: 'guid_123'
// msg.level: log
// msg.time: 1599215203843
```

## Api

### config(options)

Set logger config.

- param [Object] options: constructor options

Example:

```js
const logger = new colorogger();

logger.config({
  meta: {
    guid: 'guid_123',
  },
  transport(msg) {
    console.log(msg);
  }
})

logger.log('log text');
// msg.content: ['log text']
// msg.flag: ''
// msg.grade: 1
// msg.guid: 'guid_123'
// msg.level: log
// msg.time: 1599215203843
```

### fork(options)

Clone instance.

- param [Object] options: constructor options

Example:

```js
const logger = new colorogger({
  meta: {
    guid: 'guid_123',
  },
  transport(msg) {
    console.log(msg);
  }
});

logger.log('log text');
// msg.content: ['log text']
// msg.guid: 'guid_123'
logger.success('success text');
// msg.content: ['success text']
// msg.guid: 'guid_123'
```

### method(name, options?)

Extend a method for logger instance.

- param [String] name: method name
- param [Object] options: method options
  - param [String] options.level: method log level. optional value ['debug', 'log', 'info', 'warn', 'error'].
  - param [String] options.flag: method flag name. will be appended to transport msg property.
  - param [String] options.color: method color. use it will ignore theme color.

Example:

```js
const logger = new colorogger({
  transport(msg) {
    console.log(msg);
  }
});

logger.method('intro', {
  level: 'info',
  flag: 'intro',
  color: '#ff9501',
});

logger.intro('intro text');
// msg.content: ['intro text']
// msg.flag: 'intro'
// msg.level: 'info'
```

### theme(spec)

Custom color setting.

- param [Object] options: theme options
  - param [Object] options.colors: color options
    - param [String] options.colors[name]: method name's color value
  - param [Object] options.icons: icon options
    - param [Object] options.icons[name]: method name's icon setting
      - param [String] options.icons[name].icon: icon string
      - param [String] options.icons[name].color: icon color

Example:

```js
const logger = new colorogger({
  transport(msg) {
    console.log(msg);
  }
});

logger.method('intro', {
  level: 'info',
  flag: 'intro',
});

logger.theme({
  colors: {
    intro: '#ff9501',
  },
  icons: {
    intro: {
      icon: 'i',
      color: '#00ff00',
    }
  }
});

logger.intro('intro text');
```

![intro demo](https://raw.githubusercontent.com/TabSpace/colorogger/master/example/color-intro.jpg)

### destroy()

Destroy instance.
