'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadFile = function downloadFile(fileUrl) {
    return new _es6Promise2.default(function (resolve) {
        var urlParsed = _url2.default.parse(fileUrl);
        var pathParsed = _path2.default.parse(urlParsed.pathname);
        var tempName = _temp2.default.path({
            suffix: pathParsed.ext
        });
        var file = _fs2.default.createWriteStream(tempName);
        return _http2.default.get(fileUrl, function (response) {
            response.pipe(file);
            response.on('end', function () {
                resolve(tempName);
            });
        });
    });
};

exports.default = downloadFile;