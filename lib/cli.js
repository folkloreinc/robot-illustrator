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

_commander2.default.command('create-document').description('Create new document').option('-w, --width <n>', 'The width of the document', parseInt, 800).option('-h, --height <n>', 'The height of the document', parseInt, 600).action(function (env) {
    _index2.default.createDocument(env.width, env.height);
});

_commander2.default.command('add-text [text]').description('Add text to a document').action(function (text) {
    _index2.default.addText(text);
});

_commander2.default.command('add-image [url]').description('Add an image to a document').action(function (url) {
    _index2.default.addImage(url);
});

_commander2.default.parse(process.argv);

if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp();
}