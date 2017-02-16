'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _nodeOsascript = require('node-osascript');

var _nodeOsascript2 = _interopRequireDefault(_nodeOsascript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var executeScript = function executeScript(script) {
    return new _es6Promise2.default(function (resolve, reject) {
        _nodeOsascript2.default.execute(script, function (err) {
            if (err) {
                return reject(err);
            }
            return resolve(resolve);
        });
    });
};

exports.default = executeScript;