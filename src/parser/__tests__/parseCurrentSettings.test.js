'use strict';

const parseCurrentSettings = require('../parseCurrentSettings');

test('parseCurrentSettings of OpenBio', () => {
  // in the bioreactor, these settings are obtained with command `uc`
  let currentSettings =
    '5ECCEF988000097200C80BB8F03E00960004F8D9BCA4FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000A000000140005FFFFFFFFFFFF001E001EC6C3F8DBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000724322C';

  let result = parseCurrentSettings(currentSettings, {});

  expect(result).toMatchSnapshot();
});

test('invalid characters filter', () => {
  let buffer = '000100000001000200030004414105 \n';

  let result = parseCurrentSettings(buffer, {});

  expect(result).toStrictEqual({
    epoch: 65536000,
    parameters: { A: 1, B: 2, C: 3, D: 4 },
    deviceId: 16705,
    deviceCode: 'AA',
  });
});

test('lowercase hex characters', () => {
  let buffer =
    '5eccef988000097200C80BB8F03E00960004F8D9BCA4FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000A000000140005FFFFFFFFFFFF001E001EC6C3F8DBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000724322C';

  let result = parseCurrentSettings(buffer, {});

  expect(result).toStrictEqual();
});
