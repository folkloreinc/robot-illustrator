import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const script = fs.readFileSync(path.join(__dirname, 'createDocument.scpt'));
const template = ejs.compile(`${script}`);

export default (width, height) => template({
    width,
    height,
});
