import fs from 'fs';
import path from 'path';

// Utils
import executeScript from './utils/executeScript';
import downloadFile from './utils/downloadFile';

// Actions
import createDocument from './actions/createDocument';
import addImage from './actions/addImage';
import addText from './actions/addText';
import move from './actions/move';

class Illustrator {
    static start() {
        const script = fs.readFileSync(path.join(__dirname, 'actions/start.scpt'));
        return executeScript(script);
    }

    static createDocument(width, height) {
        const script = createDocument(width, height);
        return executeScript(script);
    }

    static addImage(url, options) {
        return downloadFile(url)
            .then((imagePath) => {
                const script = addImage(imagePath, options);
                return executeScript(script);
            });
    }

    static addText(text, options) {
        const script = addText(text, options);
        return executeScript(script);
    }

    static move(type, name, x, y, options) {
        let itemType = 'item';
        if (type === 'text') {
            itemType = 'text frame';
        } else if (type === 'image') {
            itemType = 'placed item';
        } else if (type === 'shape') {
            itemType = 'placed item';
        }
        const script = move(itemType, name, x, y, options);
        return executeScript(script);
    }
}

export default Illustrator;
