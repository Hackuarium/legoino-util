'use strict';

const debug = require('debug')('legoino:parser:processMultilogLine');

const checkCheckDigit = require('../util/checkCheckDigit');
const hexToInt16 = require('../util/hexToInt16');

const parseParameters = require('./parseParameters');

/**
 * Parse a multilog line.
 * @param {string} line
 * @param {object} [options={}]
 * @param {boolean} [options.hasEvent=true] Specify wether the log contains an event
 * @param {boolean} [options.flatten=false] The parsed log will have all properties at the same level (no sub-object for the parameters)
 * @param {boolean} [options.parametersArray=false] Add an array with all the parameters to the result
 * @return {object} The parsed line.
 *
 * Warning: parameters that are undefined are not returned!
 */
module.exports = function parseMultilogLine(line, options) {
  let { hasEvent = true, flatten = false, parametersArray = false } = options;

  // keep only valid characters
  line = line.replace(/[^0-9A-F]/gi, '');

  const entry = {};

  if (checkCheckDigit(line)) {
    entry.id = parseInt(`${line.substr(0, 8)}`, 16);
    entry.epoch = parseInt(`${line.substr(8, 8)}`, 16) * 1000;
    let parseResult = parseParameters(
      line.substring(16, line.length - 6 - (hasEvent ? 8 : 0)),
      options,
    );
    if (flatten) {
      Object.assign(entry, parseResult.parameters);
    } else {
      entry.parameters = parseResult.parameters;
    }
    if (parametersArray) {
      entry.parametersArray = parseResult.parametersArray;
    }

    if (hasEvent) {
      entry.eventId = hexToInt16(line.substr(line.length - 14, 4));
      entry.eventValue = hexToInt16(line.substr(line.length - 10, 4));
    }

    entry.deviceId = hexToInt16(line.substr(line.length - 6, 4));
    if (!entry.deviceId) {
      throw new Error('Could not parse device id in processMultilogLine');
    }
  } else {
    debug('Check digit error', line);
    throw new Error('Check digit error');
  }
  return entry;
};
