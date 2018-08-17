'use strict';

module.exports = {
  parseMultilog: require('./parser/parseMultilog'),
  parseCompactLog: require('./parser/parseCompactLog'),
  deviceIdNumberToString: require('./util/deviceIdNumberToString'),
  deviceIdStringToNumber: require('./util/deviceIdStringToNumber'),
  calculateCheckDigit: require('./util/calculateCheckDigit')
};
