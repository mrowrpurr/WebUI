window.console = {
    log: (...args) => { window.consoleLogToTests('CONSOLE.LOG', ...args) },
    error: (...args) => { window.consoleLogToTests('CONSOLE.ERROR', ...args) }
}