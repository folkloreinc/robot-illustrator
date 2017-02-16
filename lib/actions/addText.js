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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var script = _fs2.default.readFileSync(_path2.default.join(__dirname, 'addText.scpt'));
var template = _ejs2.default.compile('' + script);

exports.default = function (text, _ref) {
    var x = _ref.x,
        y = _ref.y,
        name = _ref.name,
        document = _ref.document;
    return template({
        text: text,
        name: name || 'text',
        document: document || 1,
        x: x || 0,
        y: y || 0
    });
};