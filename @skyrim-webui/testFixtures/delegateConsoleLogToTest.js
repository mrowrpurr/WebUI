window.console = {
    log: (...args) => { window.consoleLogToTests(...args) }
}