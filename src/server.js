import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import camelCase from 'camel-case';
import createDebug from 'debug';
import Queue from './queue';
import Illustrator from './index';

const debug = createDebug('app:server');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());

const queue = new Queue(data => (
    Illustrator[data.action](data.parameters)
));

app.post('/action', (req, res) => {
    if (!req.body || !req.body.action) {
        return res.sendStatus(400);
    }

    debug(`Request for action ${req.body.action}`);

    res.setHeader('Content-Type', 'application/json');

    const action = camelCase(req.body.action);
    const parameters = req.body.parameters || null;
    if (typeof Illustrator[action] === 'undefined') {
        const errorMessage = `Unknown method [${action}]`;
        debug(errorMessage);
        return res.send(JSON.stringify({
            success: false,
            error: errorMessage,
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
        debug(err);
        res.send(JSON.stringify({
            success: false,
            error: err,
        }));
    });
});

app.listen(process.env.PORT || 3000, () => {
    debug('Server listening on port 3000!');
});
