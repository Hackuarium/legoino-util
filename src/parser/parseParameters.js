'use strict';

const hexToInt16 = require('../util/hexToInt16');
const numberToLabel = require('../util/numberToLabel');

// Utility functions
module.exports = function parseParameters(
  line,
  start,
  numberParameters,
  entry
) {
  for (var i = 0; i < numberParameters; i++) {
    if (i === 0) entry.parameters = {};
    var value = hexToInt16(line.substring(start + i * 4, start + 4 + i * 4));
    if (value === -32768) value = null;
    let label = numberToLabel(i);
    entry.parameters[label] = value;
  }
};
