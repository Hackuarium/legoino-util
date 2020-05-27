'use strict';

const Solar2015 = require('legoino-device-information').Solar2015;

const parseParameters = require('../parseParameters');

test('parseParameters', () => {
  let parameters = parseParameters('00FF00FFFF00FF00');
  expect(parameters).toStrictEqual({
    parameters: {
      A: 255,
      B: 255,
      C: -256,
      D: -256,
    },
    parametersArray: [255, 255, -256, -256],
  });
});

test('parseParameters with parameterLabel', () => {
  let parameters = parseParameters('00FF00FFFF00FF00', {
    deviceInformation: Solar2015,
    parameterLabel: true,
  });
  expect(parameters).toStrictEqual({
    parameters: {
      Humidity: -25.6,
      Light: 255,
      Pressure: -256,
      Temperature: 2.55,
    },
    parametersArray: [2.55, 255, -256, -25.6],
  });
});

test('parseParameters with parameterInfo', () => {
  let parameters = parseParameters('00FF00FFFF00FF00', {
    deviceInformation: Solar2015,
    parameterInfo: true,
  });
  expect(parameters).toMatchSnapshot();
});