import { LOG_COLOR } from './constants';

const error = (...message) => {
  console.log(LOG_COLOR.errorColor, ...message, LOG_COLOR.reset);
  console.log(LOG_COLOR.reset);
};

const warn = (...message) => {
  console.log(LOG_COLOR.warnColor, ...message, LOG_COLOR.reset);
  console.log(LOG_COLOR.reset);
};

const info = (...message) => {
  console.log(LOG_COLOR.infoColor, ...message, LOG_COLOR.reset);
};

const debug = (...message) => {
  console.log(LOG_COLOR.debugColor, ...message, LOG_COLOR.reset);
};

const logger = {
  error,
  warn,
  info,
  debug,
};

export default logger;
