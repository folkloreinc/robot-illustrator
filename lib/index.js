'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// Utils


// Actions


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _executeScript = require('./utils/executeScript');

var _executeScript2 = _interopRequireDefault(_executeScript);

var _downloadFile = require('./utils/downloadFile');

var _downloadFile2 = _interopRequireDefault(_downloadFile);

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

var Illustrator = function () {
    function Illustrator() {
        _classCallCheck(this, Illustrator);
    }

    _createClass(Illustrator, null, [{
        key: 'start',
        value: function start() {
            var script = _fs2.default.readFileSync(_path2.default.join(__dirname, 'actions/start.scpt'));
            return (0, _executeScript2.default)(script);
        }
    }, {
        key: 'createDocument',
        value: function createDocument(width, height) {
            var script = (0, _createDocument3.default)(width, height);
            return (0, _executeScript2.default)(script);
        }
    }, {
        key: 'addImage',
        value: function addImage(url, options) {
            return (0, _downloadFile2.default)(url).then(function (imagePath) {
                var script = (0, _addImage3.default)(imagePath, options);
                return (0, _executeScript2.default)(script);
            });
        }
    }, {
        key: 'addText',
        value: function addText(text, options) {
            var script = (0, _addText3.default)(text, options);
            return (0, _executeScript2.default)(script);
        }
    }, {
        key: 'move',
        value: function move(type, name, x, y, options) {
            var itemType = 'item';
            if (type === 'text') {
                itemType = 'text frame';
            } else if (type === 'image') {
                itemType = 'placed item';
            } else if (type === 'shape') {
                itemType = 'placed item';
            }
            var script = (0, _move3.default)(itemType, name, x, y, options);
            return (0, _executeScript2.default)(script);
        }
    }]);

    return Illustrator;
}();

exports.default = Illustrator;