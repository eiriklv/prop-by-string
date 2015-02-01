prop-by-string
=============================

#### Introduction:
Get an object property by string.
Supports nested array notation.

---------------------------------------

### getPropByString(object, propString)

Get an object property by string literal.
Any erroneous request will return `undefined`.

__Arguments__

* `object` - The object you want to fetch from.
* `propString` - A string specification of what you want to fetch.

__Example__

```js
var propByString = require('prop-by-string');

var myObject = {
  myList: [{
    myNestedList: [{
      name: 'Eirik',
      age: 28
    }]
  }]
};

var result = propByString(myObject, 'myList[0].myNestedList[0].name');
// Eirik

var result = propByString(myObject, 'myList[0].myNestedList[0].notHere');
// undefined
```
