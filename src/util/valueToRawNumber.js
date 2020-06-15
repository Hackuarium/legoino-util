'use strict';

const DeviceInformation = require('legoino-device-information');

const labelToNumber = require('./labelToNumber');

module.exports = function valueToRawNumber(label, value, kind) {
  const deviceInformation = DeviceInformation[kind];
  return value * (deviceInformation[labelToNumber(label)].factor || 1);
};
