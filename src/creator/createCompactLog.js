'use strict';

/**
 * A log entry is a hexadecimal line composed of :
 * - epoch (8)
 * - a list of parameters values (n * 4)
 * - a device ID (4)
 * - a checkdigit (2)
 *
 * This means that for 26 parameters, the length of a log is 134 hexadecimal characters.
 */

const calculateCheckDigit = require('../util/calculateCheckDigit');
const int16ToHex = require('../util/int16ToHex');
const numberToLabel = require('../util/numberToLabel');

module.exports = function createCompactLog(data = {}, numberParameters = 26) {
  if (!data.parameters) data.parameters = [];
  let result = '';
  result += Number(data.epoch | 0)
    .toString(16)
    .padStart(8, '0');
  for (let i = 0; i < numberParameters; i++) {
    let label = numberToLabel(i);
    result += int16ToHex(data.parameters[label]);
  }
  result += int16ToHex(data.deviceId);
  result += calculateCheckDigit(result).toString(16).padStart(2, '0');
  return result.toUpperCase();
};
