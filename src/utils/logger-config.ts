import { Configuration } from 'log4js'

const logConfig: Configuration = {
  appenders: {
    console: { type: 'console' },
    infoFile: { type: 'file', filename: 'logs/info.log' },
    errorFile: { type: 'file', filename: 'logs/error.log' },
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
    info: { appenders: ['infoFile', 'console'], level: 'info' },
    error: { appenders: ['errorFile', 'console'], level: 'error' },
  },
}

export default logConfig
