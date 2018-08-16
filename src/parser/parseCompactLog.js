'use strict';

const debug = require('debug')('legoino:parser:parseCompactLog');

const deviceIdNumberToString = require('../util/deviceIdNumberToString');

const { checkDigit, parseParameters, convertSignedIntHexa } = require('./util');

module.exports = function parseCompactLog(line, numberParameters) {
  var lineLength = numberParameters * 4 + 14;

  // this line contains the 26 parameters as well as the check digit. We should
  // only consider the line if the check digit is ok
  const entry = {};
  if (lineLength && line.length !== lineLength) {
    debug(
      'Unexpected response length: ',
      line.length,
      'instead of ',
      lineLength
    );
    throw new Error('Unexpected response length');
  }

  if (checkDigit(line)) {
    entry.epoch = parseInt(line.substring(0, 8), 16);
    parseParameters(line, 8, numberParameters, entry);
    entry.deviceId = convertSignedIntHexa(
      line.substring(8 + numberParameters * 4, 12 + numberParameters * 4)
    );
    if (!entry.deviceId) {
      throw new Error('Could not parse device id in process StatusLine');
    }
    entry.deviceCode = deviceIdNumberToString(entry.deviceId);
  } else {
    debug('Check digit error', line);
    throw new Error('Check digit error');
  }
  return entry;
};
