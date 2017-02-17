import express from 'express';
import bodyParser from 'body-parser';
import camelCase from 'camel-case';
import createDebug from 'debug';
import Queue from './queue';
import Illustrator from './index';

const debugServer = createDebug('app:server');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

const queue = new Queue(data => (
    Illustrator[data.action](data.parameters)
));

app.post('/jobs', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    res.setHeader('Content-Type', 'application/json');

    const action = camelCase(req.body.action);
    const parameters = req.body.parameters || null;
    if (typeof Illustrator[action] === 'undefined') {
        return res.send(JSON.stringify({
            success: false,
            error: `Unknown method [${action}]`,
        }));
    }

    return queue.addJob({
        action,
        parameters,
    }).then((data) => {
        res.send(JSON.stringify({
            success: true,
            data,
        }));
    }, (err) => {
        res.send(JSON.stringify({
            success: false,
            error: err,
        }));
    });
});

app.listen(process.env.PORT || 3000, () => {
    debugServer('Server listening on port 3000!');
});
