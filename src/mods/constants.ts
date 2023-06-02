export const STRING_AS_TYPES = ['undefined', 'number', 'boolean'];

export const COLOR_DEBUG = 'magenta';
export const COLOR_LOG = '';
export const COLOR_INFO = '#1e90ff';
export const COLOR_WARN = '#ffd700';
export const COLOR_ERROR = 'red';
export const COLOR_SUCCESS = '#04be02';
export const COLOR_FAIL = '#ff6347';
export const COLOR_TIP = '#6495ed';
export const COLOR_STRESS = '#f4a0ab';

export const ICON_DEBUG = '#';
export const ICON_LOG = '.';
export const ICON_INFO = '*';
export const ICON_WARN = '!';
export const ICON_ERROR = 'x';
export const ICON_SUCCESS = '✓';
export const ICON_FAIL = '☢';
export const ICON_TIP = '✱';
export const ICON_STRESS = '⚑';

export const DEFAULT_LEVELS = {
  debug: 0,
  log: 1,
  info: 2,
  warn: 3,
  error: 4,
};

export const DEFAULT_COLORS = {
  debug: '',
  log: '',
  info: '',
  warn: COLOR_WARN,
  error: COLOR_ERROR,
  success: COLOR_SUCCESS,
  fail: COLOR_FAIL,
  tip: COLOR_TIP,
  stress: COLOR_STRESS,
};

export const DEFAULT_ICONS = {
  debug: {
    icon: ICON_DEBUG,
    color: COLOR_DEBUG,
  },
  log: {
    icon: ICON_LOG,
    color: COLOR_LOG,
  },
  info: {
    icon: ICON_INFO,
    color: COLOR_INFO,
  },
  warn: {
    icon: ICON_WARN,
    color: COLOR_WARN,
  },
  error: {
    icon: ICON_ERROR,
    color: COLOR_ERROR,
  },
  success: {
    icon: ICON_SUCCESS,
    color: COLOR_SUCCESS,
  },
  fail: {
    icon: ICON_FAIL,
    color: COLOR_FAIL,
  },
  tip: {
    icon: ICON_TIP,
    color: COLOR_TIP,
  },
  stress: {
    icon: ICON_STRESS,
    color: COLOR_STRESS,
  },
};
