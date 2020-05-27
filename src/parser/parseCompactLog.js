'use strict';

const debug = require('debug')('legoino:parser:parseCompactLog');

const calculateCheckDigit = require('../util/calculateCheckDigit');
const checkCheckDigit = require('../util/checkCheckDigit');
const deviceIdNumberToString = require('../util/deviceIdNumberToString');
const hexToInt16 = require('../util/hexToInt16');

const parseParameters = require('./parseParameters');

module.exports = function parseCompactLog(line, options) {
  // keep only valid characters
  line = line.replace(/[^0-9A-F]/gi, '');

  let entry = {};
  if (checkCheckDigit(line)) {
    entry.epoch = parseInt(line.substring(0, 8), 16) * 1000;
    entry.parameters = parseParameters(
      line.substring(8, line.length - 6),
      options,
    ).parameters;
    entry.deviceId = hexToInt16(
      line.substring(line.length - 6, line.length - 2),
    );
    entry.deviceCode = deviceIdNumberToString(entry.deviceId);
  } else {
    debug('Check digit error', line);
    throw new Error(
      `Check digit error. Should be: ${calculateCheckDigit(line).toString(16)}`,
    );
  }
  return entry;
};
