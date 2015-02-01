(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(this, function() {

  return function(o, s) {
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

}));
