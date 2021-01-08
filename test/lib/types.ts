import ServerLogger from '../../src/server';
import ClientLogger from '../../src/server';
import { LoggerOptions } from '../../src/types';

export interface Factory {
  new (options?: LoggerOptions): ServerLogger | ClientLogger;
}
