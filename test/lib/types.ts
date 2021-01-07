import ServerLogger from '../../src/server';
import ClientLogger from '../../src/server';

export interface Factory {
  new (options?: LoggerOptions): ServerLogger | ClientLogger;
}
