var util = require('util');

function set(s, u, o) {
  s = s.replace(/\[(\w+)\]/g, '.$1');
  s = s.replace(/^\./, '');

  var a = s.split('.');

  return (function iter(object) {
    var n = a.shift();

    if (!object[n]){
      object[n] = {};
    }

    if (a.length) {
      return iter(object[n]);
    }
    object[n] = u;
    return o
  }(o));
};

var original = {
  a: {
    b: {
      c: {
        d: [['hello']]
      }
    }
  }
}

var transformed = set('a.b.c.d[0][1]', 'world', original);

console.log(util.inspect(transformed, { depth: 10 }));
