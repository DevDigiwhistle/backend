import log4js, { type Logger } from 'log4js'
import logConfig from './logger-config'

export interface IAppLogger {
  info: (message: string) => void
  debug: (message: string) => void
  error: (message: string) => void
  warn: (message: string) => void
}

export class AppLogger implements IAppLogger {
  private static instance: AppLogger
  private readonly logger: Logger

  private constructor () {
    log4js.configure(logConfig)
    this.logger = log4js.getLogger()
  }

  static getInstance () {
    if (AppLogger.instance === null) {
      AppLogger.instance = new AppLogger()
    }
    return AppLogger.instance
  }

  info (message: string): void {
    this.logger.level = 'info'
    this.logger.info(message)
  }

  error (message: string): void {
    this.logger.level = 'error'
    this.logger.error(message)
  }

  debug (message: string): void {
    this.logger.level = 'debug'
    this.logger.debug(message)
  }

  warn (message: string): void {
    this.logger.level = 'warn'
    this.logger.warn(message)
  }
}

export default AppLogger
