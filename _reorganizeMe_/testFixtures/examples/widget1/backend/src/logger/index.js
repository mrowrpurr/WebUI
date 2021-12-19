import { writeLogs } from 'skyrimPlatform';
import settings from '~/settings';
import info from '~/modInfo';
var logger = (function () {
    var logLevels = {
        error: { level: 0, prefix: '[error]' },
        warn: { level: 1, prefix: '[warn]' },
        info: { level: 2, prefix: '[info]' },
        debug: { level: 3, prefix: '[debug]' },
    };
    var currentLevel = logLevels[settings.logLevel]
        ? logLevels[settings.logLevel].level
        : logLevels.debug.level;
    function appendMessage(prefix, msg) {
        writeLogs(info.title, "".concat(prefix, " ").concat(msg));
    }
    return {
        log: function (level, msg) {
            if (logLevels[level] && logLevels[level].level <= currentLevel)
                appendMessage(logLevels[level].prefix, msg);
        },
        debug: function (msg) { return appendMessage(logLevels.debug.prefix, msg); },
        info: function (msg) { return appendMessage(logLevels.info.prefix, msg); },
        warn: function (msg) { return appendMessage(logLevels.warn.prefix, msg); },
        error: function (msg) { return appendMessage(logLevels.error.prefix, msg); },
    };
})();
export default logger;
