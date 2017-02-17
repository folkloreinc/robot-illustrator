'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _camelCase = require('camel-case');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('app:server');

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({
    extended: false
}));
app.use(_bodyParser2.default.json());

var queue = new _queue2.default(function (data) {
    return _index2.default[data.action](data.parameters);
});

app.post('/action', function (req, res) {
    if (!req.body || !req.body.action) {
        return res.sendStatus(400);
    }

    debug('Request for action ' + req.body.action);

    res.setHeader('Content-Type', 'application/json');

    var action = (0, _camelCase2.default)(req.body.action);
    var parameters = req.body.parameters || null;
    if (typeof _index2.default[action] === 'undefined') {
        var errorMessage = 'Unknown method [' + action + ']';
        debug(errorMessage);
        return res.send(JSON.stringify({
            success: false,
            error: errorMessage
        }));
    }

    return queue.addJob({
        action: action,
        parameters: parameters
    }).then(function (data) {
        res.send(JSON.stringify({
            success: true,
            data: data
        }));
    }, function (err) {
        debug(err);
        res.send(JSON.stringify({
            success: false,
            error: err
        }));
    });
});

app.listen(process.env.PORT || 3000, function () {
    debug('Server listening on port 3000!');
});