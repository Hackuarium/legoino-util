'use strict';

module.exports = {
  parseParameters,
  checkDigit,
  convertSignedIntHexa
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
    checkDigit ^= parseInt(`0x${line[i]}${line[i + 1]}`);
  }
  if (checkDigit === 0) return true;
  return false;
}

function convertSignedIntHexa(hexa) {
  var value = parseInt(`0x${hexa}`);
  if (value > 32767) {
    return (65536 - value) * -1;
  }
  return value;
}
