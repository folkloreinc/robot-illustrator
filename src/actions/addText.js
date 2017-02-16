import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const script = fs.readFileSync(path.join(__dirname, 'addText.scpt'));
const template = ejs.compile(`${script}`);

export default (text, { x, y, name, document }) => template({
    text,
    name: name || 'text',
    document: document || 1,
    x: x || 0,
    y: y || 0,
});
