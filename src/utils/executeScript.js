import Promise from 'es6-promise';
import osascript from 'node-osascript';

const executeScript = script => (
    new Promise((resolve, reject) => {
        osascript.execute(script, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(resolve);
        });
    })
);

export default executeScript;
