import path = require('path');
import fs = require('fs');

export function writeErroLog(error) {
  let logDirectory = path.join(__dirname, 'log/');
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  let date = new Date();
  let filenam = [
    'detailedlog',
    date.toLocaleDateString().replace(/\//g, '_'),
    '.log',
  ];
  const logText = [
    '\n\n',
    error.timestamp,
    'code :',
    error.code,
    '  method :',
    error.method,
    "  ip : ", error.ip,
    '\nurl :',
    error.path,
    '\nmessage : ',
    error.message,
    '\nstack : ',
    error.stack,
    "\nbody : ", error.body,
  ];
  fs.appendFile(logDirectory + filenam, logText.join(' '), (err) => {
    if (err) return err;
  });
}