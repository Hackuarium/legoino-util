'use strict';

const parseMultilog = require('../parseMultilog');

test('parseMultilog OpenBio', () => {
  let buffer =
    '0000CAD05ECBCE73800009EF00C80BB8F02400980004F8D9BCA4FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000A000000000000243242';

  let result = parseMultilog(buffer, {kind: 'OpenBio'});

  expect(result).toStrictEqual({
    epoch: 65536000,
    parameters: { A: 1, B: 2, C: 3, D: 4 },
    deviceId: 16705,
    deviceCode: 'AA',
  });
});
