import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const script = fs.readFileSync(path.join(__dirname, 'addText.scpt'));
const template = ejs.compile(`${script}`);

export default (text, x, y) => template({
    text,
    x: x || 0,
    y: y || 0,
});
