export interface LoggerOptions {
  color?: Boolean;
  timeStamp?: Boolean;
  meta?: Object;
  timeTemplate?: String;
  wrapIcon?: Function;
  wrapTag?: Function;
  print?: Boolean;
  transport?: Function;
}

export interface ThemeOptions {
  colors?: Object;
  icons?: Object;
}
