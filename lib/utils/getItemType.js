'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getItemType = function getItemType(type) {
    var itemType = 'item';
    if (type === 'text') {
        itemType = 'text frame';
    } else if (type === 'image') {
        itemType = 'placed item';
    } else if (type === 'shape') {
        itemType = 'placed item';
    }
    return itemType;
};

exports.default = getItemType;