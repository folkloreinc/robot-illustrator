import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import tinycolor from 'tinycolor2';

const script = fs.readFileSync(path.join(__dirname, 'drawShape.scpt'));
const template = ejs.compile(`${script}`);

export default (shape, width, height, { x, y, color, name, document, layer }) => template({
    shape,
    x: x || 0,
    y: y || 0,
    color: tinycolor(color || '#000').toRgb(),
    width: parseInt(width || 100, 10),
    height: parseInt(height || 100, 10),
    name: name || 'shape',
    document: document || 1,
    layer: layer || 'Editable',
});
