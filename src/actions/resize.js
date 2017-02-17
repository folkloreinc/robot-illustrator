import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const script = fs.readFileSync(path.join(__dirname, 'resize.scpt'));
const template = ejs.compile(`${script}`);

export default (type, name, width, height, { scale, document, layer }) => template({
    type,
    name,
    document: document || 1,
    layer: layer || 'Editable',
    scale: scale || null,
    width: width || 0,
    height: height || 0,
});
