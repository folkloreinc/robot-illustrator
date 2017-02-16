import fs from 'fs';
import path from 'path';

// Utils
import executeScript from './utils/executeScript';
import downloadFile from './utils/downloadFile';
import getItemType from './utils/getItemType';

// Actions
import createDocument from './actions/createDocument';
import addImage from './actions/addImage';
import addText from './actions/addText';
import move from './actions/move';
import resize from './actions/resize';

class Illustrator {

    /**
     * Start illustrator
     * @return Promise
     */
    static start() {
        const script = fs.readFileSync(path.join(__dirname, 'actions/start.scpt'));
        return executeScript(script);
    }

    /**
     * Create a document
     *
     * @param width int The width of the document
     * @param height int The height of the document
     * @return Promise
     */
    static createDocument(width, height) {
        const script = createDocument(width, height);
        return executeScript(script);
    }

    /**
     * Add an image
     *
     * @param url string The url fo the image
     * @param options { x, y, name, document } The options of the image
     * @return Promise
     */
    static addImage(url, options) {
        return downloadFile(url)
            .then((imagePath) => {
                const script = addImage(imagePath, options);
                console.log(script);
                return executeScript(script);
            });
    }

    /**
     * Add a text
     *
     * @param text string The url fo the image
     * @param options { x, y, name, document } The options of the text
     * @return Promise
     */
    static addText(text, options) {
        const script = addText(text, options);
        return executeScript(script);
    }

    /**
     * Move an item
     *
     * @param type string The type of the item
     * @param name string The name of the item
     * @param x int The x coordinates
     * @param y int The y coordinates
     * @param options { document } The options of the move
     * @return Promise
     */
    static move(type, name, x, y, options) {
        const itemType = getItemType(type);
        const script = move(itemType, name, x, y, options);
        return executeScript(script);
    }

    /**
     * Resize an item
     *
     * @param type string The type of the item
     * @param name string The name of the item
     * @param width int The new width
     * @param height int The new height
     * @param options { document } The options of the move
     * @return Promise
     */
    static resize(type, name, width, height, options) {
        const itemType = getItemType(type);
        const script = resize(itemType, name, width, height, options);
        return executeScript(script);
    }
}

export default Illustrator;
