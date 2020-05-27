'use strict';

const DeviceInformation = require('legoino-device-information');

const hexToInt16 = require('../util/hexToInt16');
const numberToLabel = require('../util/numberToLabel');

/**
 * Parse a buffer (String) containing 4 hexadecimal symbols per parameter
 * @param {string} buffer
 * @param {object} [options={}]
 * @param {boolean} [options.parameterLabel=false] Use the variable property of device info as property name
 * @param {boolean} [options.parameterInfo=false] Show all the information about the parameter in the value
 * @param {string} [options.kind=undefined] Specify a device type from those that exist in `legoino-device-information`
 * @param {object} [options.deviceInformation=undefined] Pass information for a device that does not exist in `legoino-device-information`. To use if `options.kind` is undefined.
 * @return {object} The parsed parameters
 */

module.exports = function parseParameters(buffer, options = {}) {
  let {
    parameterLabel = false,
    parameterInfo = false,
    kind = undefined,
    deviceInformation = DeviceInformation[kind],
  } = options;

  // console.log(kind);
  // console.log(deviceInformation);

  let parameters = {};
  let parametersArray = [];
  let status = { isValid: true };

  let numberOfParameters = buffer.length / 4;
  if (
    deviceInformation &&
    numberOfParameters !== deviceInformation.numberOfParameters &&
    numberOfParameters !== deviceInformation.numberLogParameters
  ) {
    status.isValid = false;
    status.error =
      'The number of parameters is not equal to the one described in the deviceInformation';
  }

  if (!deviceInformation) deviceInformation = { parameters: [] };

  for (let i = 0; i < numberOfParameters; i++) {
    if (!deviceInformation.parameters[i]) {
      deviceInformation.parameters[i] = {
        variable: numberToLabel(i),
        label: numberToLabel(i),
        factor: 1,
      };
    }

    let valueNumber = hexToInt16(buffer.substring(i * 4, i * 4 + 4));
    if (valueNumber === -32768) valueNumber = undefined;

    let label = parameterLabel
      ? deviceInformation.parameters[i].variable ||
        deviceInformation.parameters[i].name
      : numberToLabel(i);

    if (label === undefined) continue;

    let value;
    if (parameterInfo) {
      value = Object.assign({}, deviceInformation.parameters[i], {
        index: i,
        originalValue: valueNumber,
        value:
          valueNumber === undefined
            ? valueNumber
            : valueNumber / (deviceInformation.parameters[i].factor || 1),
      });
    } else {
      value =
        valueNumber === undefined
          ? valueNumber
          : valueNumber / (deviceInformation.parameters[i].factor || 1);
    }

    if (value !== undefined) parameters[label] = value;
    parametersArray.push(value);
  }

  return { parameters, parametersArray };
};
