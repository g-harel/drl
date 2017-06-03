const pathToRegexp = require('path-to-regexp');

const is = (type) => (value) => {
    if (typeof value !== type) {
        throw new Error(`${value} is not a ${type}`);
    }
};

const add = (store) => (path, callback) => {
    is('string')(path);
    is('function')(callback);
    store.push({
        pattern: pathToRegexp(path, [], {strict: true}),
        callback,
    });
};

const exec = (store) => (path, params = {}) => {
    is('string')(path);
    is('object')(params);
    for (let i = 0; i < store.length; ++i) {
        let test = store[i].pattern.exec(path);
        if (test === null) {
            continue;
        }
        test.shift();
        store[i].pattern.keys.forEach((key, i) => {
            params[key.name] = test[i];
        });
        return store[i].callback(params);
    }
};

const drl = () => {
    const pathStore = [];

    return {
        add: add(pathStore),
        exec: exec(pathStore),
    };
};

module.exports = drl;
