import { writeLogs } from 'skyrimPlatform'
import settings from '~/settings'
import info from '~/modInfo'

type LogLevel = { level: number; prefix: string }

const logger = (() => {
  const logLevels: { [key: string]: LogLevel } = {
    error: { level: 0, prefix: '[error]' },
    warn: { level: 1, prefix: '[warn]' },
    info: { level: 2, prefix: '[info]' },
    debug: { level: 3, prefix: '[debug]' },
  }

  const currentLevel = logLevels[settings.logLevel]
    ? logLevels[settings.logLevel].level
    : logLevels.debug.level

  function appendMessage(prefix: string, msg: string) {
    writeLogs(info.title, `${prefix} ${msg}`)
  }

  return {
    log: (level: string, msg: string) => {
      if (logLevels[level] && logLevels[level].level <= currentLevel)
        appendMessage(logLevels[level].prefix, msg)
    },

    debug: (msg: string) => appendMessage(logLevels.debug.prefix, msg),
    info: (msg: string) => appendMessage(logLevels.info.prefix, msg),
    warn: (msg: string) => appendMessage(logLevels.warn.prefix, msg),
    error: (msg: string) => appendMessage(logLevels.error.prefix, msg),
  }
})()

export default logger
