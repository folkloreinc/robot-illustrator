import fs from 'fs';
import url from 'url';
import path from 'path';
import http from 'http';
import Promise from 'es6-promise';
import temp from 'temp';

const downloadFile = fileUrl => (
    new Promise((resolve) => {
        const urlParsed = url.parse(fileUrl);
        const pathParsed = path.parse(urlParsed.pathname);
        const tempName = temp.path({
            suffix: pathParsed.ext,
        });
        const file = fs.createWriteStream(tempName);
        return http.get(fileUrl, (response) => {
            response.pipe(file);
            response.on('end', () => {
                resolve(tempName);
            });
        });
    })
);


export default downloadFile;
