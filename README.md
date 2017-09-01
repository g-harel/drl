# [drl](https://github.com/g-harel/drl)

> Url addressable function storage.

Store callback functions and invoke them using a url path.

Express-style route matching. (ex. `/(apple-)?icon-:res(\\d+).png`)

Priority to first added matching route.

## Install

````
$ npm install --save drl
````

## Usage

````javascript
const drl = require('drl');

const store = drl();

// adding a path
store.add(path, callback);
           ┌┘      └┐
         String  Function

// querying paths
store.exec(path, params?);
           ┌┘      └┐
         String   Object
````

````javascript
const drl = require('drl');

const store = drl();

store.add('/user/:id/execute', ({id, action}) => {
    // ...
    return true;
});

store.exec('user/123/execute', {action: 'DELETE'}); // true
````