const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'ddMMyyyy HH:mm:ss');
  const logItem = `${dateTime} ${uuid()} ${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    } else {
      await fsPromises.appendFile(
        path.join(__dirname, '..', 'logs', logFileName),
        logItem
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
  next();
};

module.exports = { logger, logEvents };
