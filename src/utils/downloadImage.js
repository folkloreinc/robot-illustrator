import path from 'path';
import Promise from 'es6-promise';
import sharp from 'sharp';
import temp from 'temp';

import downloadFile from './downloadFile';

const downloadImage = fileUrl => (
    downloadFile(fileUrl)
        .then((tempPath) => {
            const pathParsed = path.parse(tempPath);
            const tempImagePath = temp.path({
                suffix: pathParsed.ext && pathParsed.ext.length ? pathParsed.ext : '.jpg',
            });
            return new Promise((resolve, reject) => {
                sharp(tempPath)
                    .resize(2000, 2000)
                    .toFile(tempImagePath, (err) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(tempImagePath);
                    });
            });
        })
);


export default downloadImage;
