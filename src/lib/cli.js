var s = {
  reset: ['\x1b[0m', '\x1b[0m'],
  bold: ['\x1b[1m', '\x1b[22m'],
  red: ['\x1b[31m', '\x1b[39m'],
  green: ['\x1b[32m', '\x1b[39m'],
  yellow: ['\x1b[33m', '\x1b[39m'],
  magenta: ['\x1b[35m', '\x1b[39m'],
  cyan: ['\x1b[36m', '\x1b[39m'],
  white: ['\x1b[37m', '\x1b[39m'],
  gray: ['\x1B[90m', '\x1b[39m']
};

module.exports = {
  clearLog: clearLog,
  err: err,
  exit: exit,
  warn: warn,
  log: log
};

function clearLog(msg) {
  process.stdout.write("\u001b[0G"+title('green')+msg);
}

function err(msg) {
  process.stderr.write("\n"+title("red")+msg);
}

function exit(code) {
  process.exit(code || 1);
}

function log(msg) {
  process.stdout.write("\n"+title("green")+msg);
}

function title(color){
  return [
      s.bold[0],
      "[",
      s.bold[1],
      s[color][0],
      "webdriver-sync",
      s[color][1],
      s.bold[0],
      "]",
      s.bold[1]
    ].join('')
    + " ";
}

function warn(msg) {
  process.stdout.write("\n"+title("yellow")+msg);
}