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

var _imageSize = require('image-size');

var _imageSize2 = _interopRequireDefault(_imageSize);

var _executeScript = require('./utils/executeScript');

var _executeScript2 = _interopRequireDefault(_executeScript);

var _downloadImage = require('./utils/downloadImage');

var _downloadImage2 = _interopRequireDefault(_downloadImage);

var _getItemType = require('./utils/getItemType');

var _getItemType2 = _interopRequireDefault(_getItemType);

var _createDocument2 = require('./actions/createDocument');

var _createDocument3 = _interopRequireDefault(_createDocument2);

var _addImage2 = require('./actions/addImage');

var _addImage3 = _interopRequireDefault(_addImage2);

var _addText2 = require('./actions/addText');

var _addText3 = _interopRequireDefault(_addText2);

var _drawShape2 = require('./actions/drawShape');

var _drawShape3 = _interopRequireDefault(_drawShape2);

var _move2 = require('./actions/move');

var _move3 = _interopRequireDefault(_move2);

var _resize2 = require('./actions/resize');

var _resize3 = _interopRequireDefault(_resize2);

var _changeColor2 = require('./actions/changeColor');

var _changeColor3 = _interopRequireDefault(_changeColor2);

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
        value: function createDocument(_ref) {
            var width = _ref.width,
                height = _ref.height;

            var script = (0, _createDocument3.default)(width, height);
            return (0, _executeScript2.default)(script);
        }

        /**
         * Add an image
         *
         * @param options { url, x, y, name, document, layer } The options of the image
         * @return Promise
         */

    }, {
        key: 'addImage',
        value: function addImage(_ref2) {
            var url = _ref2.url,
                x = _ref2.x,
                y = _ref2.y,
                width = _ref2.width,
                height = _ref2.height,
                name = _ref2.name,
                document = _ref2.document,
                layer = _ref2.layer;

            return (0, _downloadImage2.default)(url).then(function (imagePath) {
                var dimensions = void 0;
                if (!width || !height) {
                    dimensions = (0, _imageSize2.default)(imagePath);
                }
                var imageWidth = width || dimensions.width;
                var imageHeight = height || dimensions.height;
                var script = (0, _addImage3.default)(imagePath, imageWidth, imageHeight, {
                    x: x,
                    y: y,
                    name: name,
                    document: document,
                    layer: layer
                });
                console.log(script);
                return (0, _executeScript2.default)(script);
            });
        }

        /**
         * Add a text
         *
         * @param options { text, x, y, name, document, layer } The options of the text
         * @return Promise
         */

    }, {
        key: 'addText',
        value: function addText(_ref3) {
            var text = _ref3.text,
                x = _ref3.x,
                y = _ref3.y,
                name = _ref3.name,
                document = _ref3.document,
                layer = _ref3.layer;

            var script = (0, _addText3.default)(text, { x: x, y: y, name: name, document: document, layer: layer });
            return (0, _executeScript2.default)(script);
        }

        /**
         * Draw shape
         *
         * @param options { shape, x, y, width, height, name, document, layer } The options of the text
         * @return Promise
         */

    }, {
        key: 'drawShape',
        value: function drawShape(_ref4) {
            var shape = _ref4.shape,
                width = _ref4.width,
                height = _ref4.height,
                x = _ref4.x,
                y = _ref4.y,
                color = _ref4.color,
                name = _ref4.name,
                document = _ref4.document,
                layer = _ref4.layer;

            var script = (0, _drawShape3.default)(shape, width, height, { x: x, y: y, color: color, name: name, document: document, layer: layer });
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
        value: function move(_ref5) {
            var type = _ref5.type,
                name = _ref5.name,
                x = _ref5.x,
                y = _ref5.y,
                document = _ref5.document,
                layer = _ref5.layer;

            var itemType = (0, _getItemType2.default)(type);
            var script = (0, _move3.default)(itemType, name, x, y, { document: document, layer: layer });
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
        value: function resize(_ref6) {
            var type = _ref6.type,
                name = _ref6.name,
                width = _ref6.width,
                height = _ref6.height,
                scale = _ref6.scale,
                document = _ref6.document,
                layer = _ref6.layer;

            var itemType = (0, _getItemType2.default)(type);
            var script = (0, _resize3.default)(itemType, name, width, height, { scale: scale, document: document, layer: layer });
            return (0, _executeScript2.default)(script);
        }

        /**
         * Change the color
         *
         * @param type string The type of the item
         * @param name string The name of the item
         * @param width int The new width
         * @param height int The new height
         * @param options { document } The options of the move
         * @return Promise
         */

    }, {
        key: 'changeColor',
        value: function changeColor(_ref7) {
            var type = _ref7.type,
                name = _ref7.name,
                color = _ref7.color,
                document = _ref7.document,
                layer = _ref7.layer;

            var itemType = (0, _getItemType2.default)(type);
            var script = (0, _changeColor3.default)(itemType, name, color, { document: document, layer: layer });
            return (0, _executeScript2.default)(script);
        }
    }]);

    return Illustrator;
}();

exports.default = Illustrator;