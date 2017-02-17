'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _tinycolor = require('tinycolor2');

var _tinycolor2 = _interopRequireDefault(_tinycolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var script = _fs2.default.readFileSync(_path2.default.join(__dirname, 'drawShape.scpt'));
var template = _ejs2.default.compile('' + script);

exports.default = function (shape, width, height, _ref) {
    var x = _ref.x,
        y = _ref.y,
        color = _ref.color,
        name = _ref.name,
        document = _ref.document,
        layer = _ref.layer;
    return template({
        shape: shape,
        x: x || 0,
        y: y || 0,
        color: (0, _tinycolor2.default)(color || '#000').toRgb(),
        width: parseInt(width || 100, 10),
        height: parseInt(height || 100, 10),
        name: name || 'shape',
        document: document || 1,
        layer: layer || 'Editable'
    });
};