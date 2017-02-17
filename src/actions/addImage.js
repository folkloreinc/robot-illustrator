import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const script = fs.readFileSync(path.join(__dirname, 'addImage.scpt'));
const template = ejs.compile(`${script}`);

export default (imagePath, width, height, { x, y, name, document, layer }) => {
    const ratios = [160 / width, 160 / height];
    const resizeRatio = Math.min(ratios[0], ratios[1]);
    return template({
        path: imagePath,
        name: name || 'image',
        document: document || 1,
        layer: layer || 'Editable',
        x: x || 0,
        y: y || 0,
        width: width * resizeRatio,
        height: height * resizeRatio,
    });
};
