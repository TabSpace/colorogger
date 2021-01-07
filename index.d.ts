declare type PlainType = undefined | null | number | string | boolean | Regexp | Date | PlainObject;

interface PlainObject {
  [key: string]: PlainType | PlainType[];
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
  meta?: PlainObject;
  metaColor?: PlainType;
  timeTemplate?: string;
  print?: boolean;
  wrapIcon?: (icon: string) => string;
  wrapTag?: (tag: string, key?: string) => string;
  transport?: (...args: PlainType[]) => void;
}

interface ThemeOptions {
  colors?: PlainObject;
  icons?: PlainObject;
}
