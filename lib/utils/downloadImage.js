'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var _downloadFile = require('./downloadFile');

var _downloadFile2 = _interopRequireDefault(_downloadFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var downloadImage = function downloadImage(fileUrl) {
    return (0, _downloadFile2.default)(fileUrl).then(function (tempPath) {
        var pathParsed = _path2.default.parse(tempPath);
        var tempImagePath = _temp2.default.path({
            suffix: pathParsed.ext && pathParsed.ext.length ? pathParsed.ext : '.jpg'
        });
        return new _es6Promise2.default(function (resolve, reject) {
            (0, _sharp2.default)(tempPath).resize(2000, 2000).toFile(tempImagePath, function (err) {
                if (err) {
                    return reject(err);
                }
                return resolve(tempImagePath);
            });
        });
    });
};

exports.default = downloadImage;