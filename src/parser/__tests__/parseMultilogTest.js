'use strict';

const parseMultilog = require('../parseMultilog');

test('parseMultilog', () => {
  var buffer = `
000100005B77EFBE0046000E003800000000000000000013000C00060000005100010011004080000000000004D242
000100015B77EFC10046000E003800000000000000000044003200100000002000020011004080000000000004D231
000100025B77EFC40047000E00380000000000020002002F0024000A0000003500010011004080000000000004D247
000100035B77EFC70047000F0038000000000001000100430032000F0000002100020011004080000000000004D22C
000100045B77EFCB0046000F003800000000000000000028002000070000003C00000011004080000000000004D248
000100055B77EFCE0047000E003800000000000000000023001C00070000004100000011004080000000000004D206
`;

  let result = parseMultilog(buffer, {
    kind: 'Computer',
    parameterLabel: false,
    parameterInfo: true,
    parametersArray: true,
    flatten: false
  });

  expect(result).toMatchSnapshot();
});

test('parseMultilog flatten', () => {
  var buffer = `
000100005B77EFBE0046000E003800000000000000000013000C00060000005100010011004080000000000004D242
000100015B77EFC10046000E003800000000000000000044003200100000002000020011004080000000000004D231
000100025B77EFC40047000E00380000000000020002002F0024000A0000003500010011004080000000000004D247
000100035B77EFC70047000F0038000000000001000100430032000F0000002100020011004080000000000004D22C
000100045B77EFCB0046000F003800000000000000000028002000070000003C00000011004080000000000004D248
000100055B77EFCE0047000E003800000000000000000023001C00070000004100000011004080000000000004D206
`;

  let result = parseMultilog(buffer, {
    kind: 'Computer',
    parameterLabel: true,
    parameterInfo: false,
    parametersArray: false,
    flatten: true
  });

  expect(result).toMatchSnapshot();
});
