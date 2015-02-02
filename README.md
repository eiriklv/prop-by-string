prop-by-string
==============

[![Build Status](https://travis-ci.org/eiriklv/prop-by-string.svg?branch=master)](https://travis-ci.org/eiriklv/prop-by-string)

#### Introduction:
Get and set an object property by string.
Supports nested array notation.

---------------------------------------

### .get(propString, object)

Get an object property by string literal.
Any erroneous request will return `undefined`.

__Arguments__

* `propString` - A string specification of what you want to fetch.
* `object` - The object you want to fetch from.

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

var result = propByString.get('myList[0].myNestedList[0].name', myObject);
// Eirik

var result = propByString.get('myList[0].myNestedList[0].notHere', myObject);
// undefined
```

---------------------------------------

### .set(propString, update, object)

Mutate an object by specifying the location as a string literal.

__Arguments__

* `propString` - A string specification of what you want to fetch.
* `update` - The update you want to insert (any primitive / object).
* `object` - The object you want to mutate.

The method returns the mutated object as a convenience.

__Example__

```js
var propByString = require('prop-by-string');

var original = {
  a: {
    b: {
      c: {
        d: [['hello']]
      }
    }
  }
}

var mutated = propByString.set('a.b.c.d[0][1]', 'world', original);
// {
//   a: {
//     b: {
//       c: {
//         d: [['hello', 'world']]
//       }
//     }
//   }
// }
```
