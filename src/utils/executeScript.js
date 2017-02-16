import Promise from 'es6-promise';
import osascript from 'node-osascript';

const executeScript = script => (
    new Promise((resolve, reject) => {
        osascript.execute(script, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
);

export default executeScript;
