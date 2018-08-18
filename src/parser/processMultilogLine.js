'use strict';

const debug = require('debug')('legoino:parser:processMultilogLine');

const deviceIdNumberToString = require('../util/deviceIdNumberToString');
const checkCheckDigit = require('../util/checkCheckDigit');
const hexToInt16 = require('../util/hexToInt16');

const parseParameters = require('./parseParameters');

module.exports = function processMultilogLine(line, options) {
  let { hasEvent = true } = options;

  const entry = {};

  if (checkCheckDigit(line)) {
    entry.id = parseInt(`${line.substr(0, 8)}`, 16);
    entry.epoch = parseInt(`${line.substr(8, 8)}`, 16) * 1000;
    entry.parameters = parseParameters(
      line.substring(16, line.length - 6 - (hasEvent ? 8 : 0)),
      options
    );
    if (options.parametersArray) {
      entry.parametersArray = Object.keys(entry.parameters).map(
        (parameter) => entry.parameters[parameter]
      );
    }

    if (hasEvent) {
      entry.eventId = hexToInt16(line.substr(line.length - 14, 4));
      entry.eventValue = hexToInt16(line.substr(line.length - 10, 4));
    }

    entry.deviceId = hexToInt16(line.substr(line.length - 6, 4));
    if (!entry.deviceId) {
      throw new Error('Could not parse device id in processMultilogLine');
    }
    entry.deviceCode = deviceIdNumberToString(entry.deviceId);
  } else {
    debug('Check digit error', line);
    throw new Error('Check digit error');
  }
  return entry;
};
