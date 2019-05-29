"use strict";
let a = 1024;
let d = [true, true, false];
let f = [1, false];
const g = [3];
let h = null;
function Filter(collection, predicate) {
    let result = [];
    for (let i = 0; i < collection.length; i++) {
        let item = collection[i];
        if (predicate(item)) {
            result.push(item);
        }
    }
    return result;
}
function MyMap(collection, map) {
    let result = [];
    for (let i = 0; i < collection.length; i++) {
        let itemSource = collection[i];
        let itemDest = map(itemSource);
        result.push(itemDest);
    }
    return result;
}
console.log("Hello World!!!");
//# sourceMappingURL=index.js.map