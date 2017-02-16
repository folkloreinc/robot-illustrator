import fs from 'fs';
import path from 'path';
import http from 'http';
import Promise from 'es6-promise';
import temp from 'temp';
import osascript from 'node-osascript';
import createDocument from './actions/createDocument';
import addImage from './actions/addImage';
import addText from './actions/addText';
import move from './actions/move';

const executeScript = script => (
    new Promise((resolve, reject) => {
        osascript.execute(script, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(resolve);
        });
    })
);

const downloadFile = url => (
    new Promise((resolve, reject) => {
        const tempName = temp.path({
            suffix: '.png',
        });
        const file = fs.createWriteStream(tempName);
        return http.get(url, (response) => {
            response.pipe(file);
            response.on('end', () => {
                resolve(tempName);
            });
        });
    })
);

class Illustrator {
    static start() {
        const script = fs.readFileSync(path.join(__dirname, 'actions/start.scpt'));
        return executeScript(script);
    }

    static createDocument(width, height) {
        const script = createDocument(width, height);
        return executeScript(script);
    }

    static addImage(url, x, y) {
        return downloadFile(url)
            .then((imagePath) => {
                const script = addImage(imagePath, x, y);
                return executeScript(script);
            });
    }

    static addText(text, x, y) {
        const script = addText(text, x, y);
        return executeScript(script);
    }

    static move(type, name, x, y) {
        let itemType = 'item';
        if (type === 'text') {
            itemType = 'text frame';
        }
        if (type === 'image') {
            itemType = 'placed item';
        }
        const script = move(itemType, name, x, y);
        return executeScript(script);
    }
}

export default Illustrator;
