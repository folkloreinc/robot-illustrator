'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadFile = function downloadFile(url) {
    return new _es6Promise2.default(function (resolve) {
        var tempName = _temp2.default.path({
            suffix: '.png'
        });
        var file = _fs2.default.createWriteStream(tempName);
        return _http2.default.get(url, function (response) {
            response.pipe(file);
            response.on('end', function () {
                resolve(tempName);
            });
        });
    });
};

exports.default = downloadFile;