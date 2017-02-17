import fs from 'fs';
import url from 'url';
import path from 'path';
import http from 'http';
import https from 'https';
import Promise from 'es6-promise';
import temp from 'temp';

const downloadFile = fileUrl => (
    new Promise((resolve) => {
        const urlParsed = url.parse(fileUrl);
        const pathParsed = path.parse(urlParsed.pathname);
        const tempName = temp.path({
            suffix: pathParsed.ext && pathParsed.ext.length ? pathParsed.ext : '.jpg',
        });
        const file = fs.createWriteStream(tempName);
        const httpRequest = urlParsed.protocol === 'https:' ? https : http;
        return httpRequest.get(fileUrl, (response) => {
            response.pipe(file);
            response.on('end', () => {
                resolve(tempName);
            });
        });
    })
);


export default downloadFile;
