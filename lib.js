(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(this, function() {

  var propByString = {};

  propByString.get = function(s, o) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');

    var a = s.split('.');

    return (function iter() {
      var n = a.shift();
      var predicate = false;

      try {
        predicate = (n in o);
      } catch (e) {}

      if (!predicate) return;
      o = o[n];

      if (a.length)
        return iter();
      return o;
    }());
  };

  propByString.set = function(s, u, o) {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');

    var a = s.split('.');

    return (function iter(object) {
      var n = a.shift();

      if (!object[n]) {
        object[n] = {};
      }

      if (a.length) return iter(object[n]);
      object[n] = u;
      return o;
    }(o));
  };

  return propByString;

}));
