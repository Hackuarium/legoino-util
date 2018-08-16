'use strict';

/**
 * A log entry is an haxadecimal line composed of :
 * - a sequendtial ID (8)
 * - epoch (8)
 * - a list of parameters values (n * 4)
 * - a log event ID (4)
 * - a log event value (4)
 * - a device ID (4)
 * - a checkdigit (2)
 * This means that for 26 parameters the length is 134
 */

module.exports = function createCompactLog(data={},numberParameters=26) {
    var result=
        Number(data.id|0).toString(16).padStart(8,'0')+
        Number(data.epoch|0).toString(16).padStart(8,'0');
        
    for (let i=0; i<numberParameters.length; i++) {
        result+=
    }
};
