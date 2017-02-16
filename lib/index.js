'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var _nodeOsascript = require('node-osascript');

var _nodeOsascript2 = _interopRequireDefault(_nodeOsascript);

var _createDocument2 = require('./actions/createDocument');

var _createDocument3 = _interopRequireDefault(_createDocument2);

var _addImage2 = require('./actions/addImage');

var _addImage3 = _interopRequireDefault(_addImage2);

var _addText2 = require('./actions/addText');

var _addText3 = _interopRequireDefault(_addText2);

var _move2 = require('./actions/move');

var _move3 = _interopRequireDefault(_move2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var downloadFile = function downloadFile(url) {
    return new _es6Promise2.default(function (resolve, reject) {
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

var Illustrator = function () {
    function Illustrator() {
        _classCallCheck(this, Illustrator);
    }

    _createClass(Illustrator, null, [{
        key: 'start',
        value: function start() {
            var script = _fs2.default.readFileSync(_path2.default.join(__dirname, 'actions/start.scpt'));
            return executeScript(script);
        }
    }, {
        key: 'createDocument',
        value: function createDocument(width, height) {
            var script = (0, _createDocument3.default)(width, height);
            return executeScript(script);
        }
    }, {
        key: 'addImage',
        value: function addImage(url, x, y) {
            return downloadFile(url).then(function (imagePath) {
                var script = (0, _addImage3.default)(imagePath, x, y);
                return executeScript(script);
            });
        }
    }, {
        key: 'addText',
        value: function addText(text, x, y) {
            var script = (0, _addText3.default)(text, x, y);
            return executeScript(script);
        }
    }, {
        key: 'move',
        value: function move(type, name, x, y) {
            var itemType = 'item';
            if (type === 'text') {
                itemType = 'text frame';
            }
            if (type === 'image') {
                itemType = 'placed item';
            }
            var script = (0, _move3.default)(itemType, name, x, y);
            return executeScript(script);
        }
    }]);

    return Illustrator;
}();

exports.default = Illustrator;