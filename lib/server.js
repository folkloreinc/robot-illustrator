'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _kue = require('kue');

var _kue2 = _interopRequireDefault(_kue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var queue = _kue2.default.createQueue();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: false
}));

app.post('/jobs', function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    res.setHeader('Content-Type', 'application/json');

    queue.create('action', {
        name: req.body.name,
        data: req.body.data
    }).save(function (err) {
        if (err) {
            return res.send(JSON.stringify({
                success: false,
                error: err
            }));
        }
        return res.send(JSON.stringify({
            success: true
        }));
    });
    return res;
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});