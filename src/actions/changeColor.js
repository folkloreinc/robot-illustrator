import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import tinycolor from 'tinycolor2';

const script = fs.readFileSync(path.join(__dirname, 'changeColor.scpt'));
const template = ejs.compile(`${script}`);

export default (type, name, color, { document, layer }) => template({
    type,
    name,
    document: document || 1,
    layer: layer || 'Editable',
    color: tinycolor(color || '#000').toRgb(),
});
