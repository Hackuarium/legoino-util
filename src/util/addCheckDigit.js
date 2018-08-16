'use strict';

module.exports = function addCheckDigit(str) {
  if (!(typeof str === 'string')) {
    throw new TypeError('addCheckDigit expects a string');
  }
  var checkDigit = 0;
  for (var i = 0; i < str.length; i++) {
    checkDigit ^= str.charCodeAt(i);
  }
  return str + String.fromCharCode(checkDigit);
};
