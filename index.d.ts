interface PlainObject {
  [key?: string]: unknown;
}

declare type SimpleValue = null | undefined | string | number | boolean;

interface SimpleObject {
  [key?: string]: SimpleValue;
}

interface IconOptions {
  [key?: string]: {
    icon?: string;
    color?: string;
  };
}

declare type ThemeProp = 'colors' | 'icons';

interface OutputOptions {
  level?: string;
  flag?: string;
  color?: string;
}

interface LoggerOptions {
  color?: boolean;
  timeStamp?: boolean;
  print?: boolean;
  metaColor?: boolean | SimpleObject;
  meta?: SimpleObject;
  timeTemplate?: string;
  wrapIcon?: (icon: string) => string;
  wrapTag?: (tag: string, key?: string) => string;
  transport?: (...args: PlainType[]) => void;
}

interface ThemeOptions {
  colors?: SimpleObject;
  icons?: IconOptions;
}

interface Message {
  content?: unknown[];
  level?: string;
  flag?: string;
  grade?: number;
  time?: number;
  __content?: unknown[];
  [key: string]: unknown;
}
