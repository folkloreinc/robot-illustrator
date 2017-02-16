import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const script = fs.readFileSync(path.join(__dirname, 'resize.scpt'));
const template = ejs.compile(`${script}`);

export default (type, name, width, height, { document }) => template({
    type,
    name,
    document: document || 1,
    width: width || 0,
    height: height || 0,
});
