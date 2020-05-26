'use strict';

const parseCompactLog = require('../parseCompactLog');

test('parseCompactLog', () => {
  let buffer = '000100000001000200030004414105';

  let result = parseCompactLog(buffer, {});

  expect(result).toStrictEqual({
    epoch: 65536000,
    parameters: { A: 1, B: 2, C: 3, D: 4 },
    deviceId: 16705,
    deviceCode: 'AA',
  });
});
