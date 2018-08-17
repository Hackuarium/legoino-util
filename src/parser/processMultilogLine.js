'use strict';

const debug = require('debug')('legoino:parser:processMultilogLine');

const deviceIdNumberToString = require('../util/deviceIdNumberToString');
const checkCheckDigit = require('../util/checkCheckDigit');
const hexToInt16 = require('../util/hexToInt16');

const parseParameters = require('./parseParameters');

module.exports = function processMultilogLine(line, options) {
  const { hasEvent = true, numberLogParameters = 26 } = options;
  let lineLength = 8 + 8 + numberLogParameters * 4 + 4 + 2;
  if (hasEvent) lineLength += 8;
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

  if (checkCheckDigit(line)) {
    entry.id = parseInt(`${line.substr(0, 8)}`, 16);
    entry.epoch = parseInt(`${line.substr(8, 8)}`, 16);
    parseParameters(line, 16, numberLogParameters, entry);

    let position = 16 + numberLogParameters * 4;
    if (hasEvent) {
      entry.eventId = hexToInt16(line.substr(position, 4));
      entry.eventValue = hexToInt16(line.substr(position + 4, 4));
      position += 8;
    }

    entry.deviceId = hexToInt16(line.substr(position, 4));
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
