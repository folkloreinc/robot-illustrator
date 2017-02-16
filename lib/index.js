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

var _getItemType = require('./utils/getItemType');

var _getItemType2 = _interopRequireDefault(_getItemType);

var _createDocument2 = require('./actions/createDocument');

var _createDocument3 = _interopRequireDefault(_createDocument2);

var _addImage2 = require('./actions/addImage');

var _addImage3 = _interopRequireDefault(_addImage2);

var _addText2 = require('./actions/addText');

var _addText3 = _interopRequireDefault(_addText2);

var _move2 = require('./actions/move');

var _move3 = _interopRequireDefault(_move2);

var _resize2 = require('./actions/resize');

var _resize3 = _interopRequireDefault(_resize2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Illustrator = function () {
    function Illustrator() {
        _classCallCheck(this, Illustrator);
    }

    _createClass(Illustrator, null, [{
        key: 'start',


        /**
         * Start illustrator
         * @return Promise
         */
        value: function start() {
            var script = _fs2.default.readFileSync(_path2.default.join(__dirname, 'actions/start.scpt'));
            return (0, _executeScript2.default)(script);
        }

        /**
         * Create a document
         *
         * @param width int The width of the document
         * @param height int The height of the document
         * @return Promise
         */

    }, {
        key: 'createDocument',
        value: function createDocument(width, height) {
            var script = (0, _createDocument3.default)(width, height);
            return (0, _executeScript2.default)(script);
        }

        /**
         * Add an image
         *
         * @param url string The url fo the image
         * @param options { x, y, name, document } The options of the image
         * @return Promise
         */

    }, {
        key: 'addImage',
        value: function addImage(url, options) {
            return (0, _downloadFile2.default)(url).then(function (imagePath) {
                var script = (0, _addImage3.default)(imagePath, options);
                console.log(script);
                return (0, _executeScript2.default)(script);
            });
        }

        /**
         * Add a text
         *
         * @param text string The url fo the image
         * @param options { x, y, name, document } The options of the text
         * @return Promise
         */

    }, {
        key: 'addText',
        value: function addText(text, options) {
            var script = (0, _addText3.default)(text, options);
            return (0, _executeScript2.default)(script);
        }

        /**
         * Move an item
         *
         * @param type string The type of the item
         * @param name string The name of the item
         * @param x int The x coordinates
         * @param y int The y coordinates
         * @param options { document } The options of the move
         * @return Promise
         */

    }, {
        key: 'move',
        value: function move(type, name, x, y, options) {
            var itemType = (0, _getItemType2.default)(type);
            var script = (0, _move3.default)(itemType, name, x, y, options);
            return (0, _executeScript2.default)(script);
        }

        /**
         * Resize an item
         *
         * @param type string The type of the item
         * @param name string The name of the item
         * @param width int The new width
         * @param height int The new height
         * @param options { document } The options of the move
         * @return Promise
         */

    }, {
        key: 'resize',
        value: function resize(type, name, width, height, options) {
            var itemType = (0, _getItemType2.default)(type);
            var script = (0, _resize3.default)(itemType, name, width, height, options);
            return (0, _executeScript2.default)(script);
        }
    }]);

    return Illustrator;
}();

exports.default = Illustrator;