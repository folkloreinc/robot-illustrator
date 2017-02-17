#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('0.0.1');

_commander2.default.command('start').description('Start Illustrator').action(function () {
    _index2.default.start();
});

_commander2.default.command('create-document').description('Create new document').option('-w, --width <n>', 'The width of the document', parseInt, 800).option('-h, --height <n>', 'The height of the document', parseInt, 600).action(function (_ref) {
    var width = _ref.width,
        height = _ref.height;

    _index2.default.createDocument({ width: width, height: height });
});

_commander2.default.command('add-text <text>').description('Add text to a document').option('-x, --x <n>', 'The x position', parseInt, 0).option('-y, --y <n>', 'The y position', parseInt, 0).option('-n, --name <n>', 'The name of the text frame', null, 'text').option('-d, --document <n>', 'The name or the index of the document', null, 1).action(function (text, _ref2) {
    var x = _ref2.x,
        y = _ref2.y,
        document = _ref2.document,
        name = _ref2.name;

    _index2.default.addText({ text: text, x: x, y: y, name: name, document: document });
});

_commander2.default.command('add-image <url>').description('Add an image to a document').option('-x, --x <n>', 'The x position', parseInt, 0).option('-y, --y <n>', 'The y position', parseInt, 0).option('-n, --name <n>', 'The name of the text frame', null, 'text').option('-d, --document <n>', 'The name or the index of the document', null, 1).action(function (url, _ref3) {
    var x = _ref3.x,
        y = _ref3.y,
        document = _ref3.document,
        name = _ref3.name;

    _index2.default.addImage({ url: url, x: x, y: y, name: name, document: document });
});

_commander2.default.command('move <type> <name> <x> <y>').description('Move an element').option('-d, --document <n>', 'The name or the index of the document', null, 1).action(function (type, name, x, y, _ref4) {
    var document = _ref4.document;

    _index2.default.move({ type: type, name: name, x: x, y: y, document: document });
});

_commander2.default.parse(process.argv);

if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp();
}