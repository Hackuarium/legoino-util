'use strict';

const util = require('../util');

describe('parser util test', () => {
  test('checkDigit', () => {
    expect(util.checkDigit('AAAAAAAA')).toBe(true);
    expect(util.checkDigit('AAAAAA')).toBe(false);
  });

  test('parseParameters', () => {
    var entry = {};
    util.parseParameters('000000FF00FFFF00FF00', 4, 4, entry);
    expect(entry).toEqual({
      parameters: {
        A: 255,
        B: 255,
        C: -256,
        D: -256
      }
    });
  });
});
