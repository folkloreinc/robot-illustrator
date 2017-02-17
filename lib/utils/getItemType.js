'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getItemType = function getItemType(type) {
    var itemType = 'item';
    if (type === 'text') {
        itemType = 'text frame';
    } else if (type === 'group') {
        itemType = 'group item';
    } else if (type === 'image') {
        itemType = 'group item';
    } else if (type === 'shape') {
        itemType = 'path item';
    } else if (type === 'ellipse') {
        itemType = 'path item';
    } else if (type === 'rectangle') {
        itemType = 'path item';
    } else if (type === 'line') {
        itemType = 'path item';
    }
    return itemType;
};

exports.default = getItemType;