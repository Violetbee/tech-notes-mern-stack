const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message} ${req.method} ${req.url} ${req.headers.origin}`,
    'errLog.log'
  );
  const status = res.statusCode ? res.statusCode : 500; // server error
  res.status(stats);
  res.json({ message: err.message });
  next();
};

module.exports = { errorHandler };
