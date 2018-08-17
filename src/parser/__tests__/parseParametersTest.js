'use strict';

const parseParameters = require('../parseParameters');

test('parseParameters', () => {
  var entry = {};
  parseParameters('000000FF00FFFF00FF00', 4, 4, entry);
  expect(entry).toEqual({
    parameters: {
      A: 255,
      B: 255,
      C: -256,
      D: -256
    }
  });
});
