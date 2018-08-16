'use strict';

module.exports = {
  parseParameters,
  checkDigit,
  int16ToHex,
  hexToInt16
};

// Utility functions
function parseParameters(line, start, numberParameters, entry) {
  for (var i = 0; i < numberParameters; i++) {
    if (i === 0) entry.parameters = {};
    var value = convertSignedIntHexa(
      line.substring(start + i * 4, start + 4 + i * 4)
    );
    if (value === -32768) value = null;
    if (i < 26) {
      entry.parameters[String.fromCharCode(65 + i)] = value;
    } else {
      entry.parameters[
        String.fromCharCode(Math.floor(i / 26) + 64, 65 + i - 26)
      ] = value;
    }
  }
}

function checkDigit(line) {
  var checkDigit = 0;
  for (var i = 0; i < line.length; i = i + 2) {
    checkDigit ^= parseInt(`${line[i]}${line[i + 1]}`, 16);
  }
  if (checkDigit === 0) return true;
  return false;
}

function hexToInt16(hexa) {
  var value = parseInt(`${hexa}`, 16);
  if (value > 32767) {
    return (65536 - value) * -1;
  }
  return value;
}

function int16ToHex(value) {
  if (value < 0) {
    value += 65536;
  }
  return Number(value)
    .toString(16)
    .padStart(4, '0');
}
