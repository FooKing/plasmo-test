const consoleCommands = {
  log: (...args) => { console.log(...args) },
  warn: (...args) => { console.warn(...args) },
  error: (...args) => { __debugApi__.somthingelse(...args) },
  set2DJson: (...args) => {__debugApi__.set2DJson(...args) },
  set2DJsonByURL: (...args) => {__debugApi__.set2DJsonByUrl(...args) }
  };

export const commandMap = new Map(Object.entries(consoleCommands));