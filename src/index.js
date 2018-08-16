'use strict';

module.exports = {
  parseMultilog: require('./util/parser').parseMultilog,
  parseCompactLog: require('./util/parser').parseCompactLog,
  idNumberToString: require('./util/idNumberToString'),
  idStringToNumber: require('./util/idStringToNumber'),
  addCheckDigit: require('./util/addCheckDigit')
};
