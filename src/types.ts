export interface PlainObject {
  [key: string]: unknown;
}

export declare type SimpleValue = null | undefined | string | number | boolean;

export interface SimpleObject {
  [key: string]: SimpleValue;
}

export interface IconOptions {
  [key: string]: {
    icon?: string;
    color?: string;
  };
}

export declare type ThemeProp = 'colors' | 'icons';

export interface OutputOptions {
  level?: string;
  flag?: string;
  color?: string;
}

export interface LoggerOptions {
  color?: boolean;
  timeStamp?: boolean;
  print?: boolean;
  metaColor?: boolean | SimpleObject;
  meta?: SimpleObject;
  timeTemplate?: string;
  wrapIcon?: (icon: string) => string;
  wrapTag?: (tag: string, key?: string) => string;
  transport?: (msg: Message) => void;
}

export interface ThemeOptions {
  colors?: SimpleObject;
  icons?: IconOptions;
}

export interface Message {
  content?: unknown[];
  level?: string;
  flag?: string;
  grade?: number;
  time?: number;
  __content?: unknown[];
  [key: string]: unknown;
}
