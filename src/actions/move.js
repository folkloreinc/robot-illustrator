import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const script = fs.readFileSync(path.join(__dirname, 'move.scpt'));
const template = ejs.compile(`${script}`);

export default (type, name, x, y) => template({
    type,
    name,
    x: x || 0,
    y: y || 0,
});
