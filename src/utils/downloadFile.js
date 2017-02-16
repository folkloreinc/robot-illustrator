import fs from 'fs';
import http from 'http';
import Promise from 'es6-promise';
import temp from 'temp';

const downloadFile = url => (
    new Promise((resolve, reject) => {
        const tempName = temp.path({
            suffix: '.png',
        });
        const file = fs.createWriteStream(tempName);
        return http.get(url, (response) => {
            response.pipe(file);
            response.on('end', () => {
                resolve(tempName);
            });
        });
    })
);


export default downloadFile;
