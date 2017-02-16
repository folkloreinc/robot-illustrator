import express from 'express';
import bodyParser from 'body-parser';
import kue from 'kue';

const app = express();
const queue = kue.createQueue();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.post('/jobs', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400);
    }

    res.setHeader('Content-Type', 'application/json');

    queue.create('action', {
        name: req.body.name,
        data: req.body.data,
    }).save((err) => {
        if (err) {
            return res.send(JSON.stringify({
                success: false,
                error: err,
            }));
        }
        return res.send(JSON.stringify({
            success: true,
        }));
    });
    return res;
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
