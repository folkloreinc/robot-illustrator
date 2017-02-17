import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

// Utils
import executeScript from './utils/executeScript';
import downloadImage from './utils/downloadImage';
import getItemType from './utils/getItemType';

// Actions
import createDocument from './actions/createDocument';
import addImage from './actions/addImage';
import addText from './actions/addText';
import drawShape from './actions/drawShape';
import move from './actions/move';
import resize from './actions/resize';
import changeColor from './actions/changeColor';

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
    static createDocument({ width, height }) {
        const script = createDocument(width, height);
        return executeScript(script);
    }

    /**
     * Add an image
     *
     * @param options { url, x, y, name, document, layer } The options of the image
     * @return Promise
     */
    static addImage({ url, x, y, width, height, name, document, layer }) {
        return downloadImage(url)
            .then((imagePath) => {
                let dimensions;
                if (!width || !height) {
                    dimensions = sizeOf(imagePath);
                }
                const imageWidth = width || dimensions.width;
                const imageHeight = height || dimensions.height;
                const script = addImage(imagePath, imageWidth, imageHeight, {
                    x,
                    y,
                    name,
                    document,
                    layer,
                });
                console.log(script);
                return executeScript(script);
            });
    }

    /**
     * Add a text
     *
     * @param options { text, x, y, name, document, layer } The options of the text
     * @return Promise
     */
    static addText({ text, x, y, name, document, layer }) {
        const script = addText(text, { x, y, name, document, layer });
        return executeScript(script);
    }

    /**
     * Draw shape
     *
     * @param options { shape, x, y, width, height, name, document, layer } The options of the text
     * @return Promise
     */
    static drawShape({ shape, width, height, x, y, color, name, document, layer }) {
        const script = drawShape(shape, width, height, { x, y, color, name, document, layer });
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
    static move({ type, name, x, y, document, layer }) {
        const itemType = getItemType(type);
        const script = move(itemType, name, x, y, { document, layer });
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
    static resize({ type, name, width, height, scale, document, layer }) {
        const itemType = getItemType(type);
        const script = resize(itemType, name, width, height, { scale, document, layer });
        return executeScript(script);
    }

    /**
     * Change the color
     *
     * @param type string The type of the item
     * @param name string The name of the item
     * @param width int The new width
     * @param height int The new height
     * @param options { document } The options of the move
     * @return Promise
     */
    static changeColor({ type, name, color, document, layer }) {
        const itemType = getItemType(type);
        const script = changeColor(itemType, name, color, { document, layer });
        return executeScript(script);
    }
}

export default Illustrator;
