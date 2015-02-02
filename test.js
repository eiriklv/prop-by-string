var propByString = require('./lib')

var testObject = {
  name: 'Eirik',
  age: 28,
  belongings: [{
    type: 'phone',
    color: 'red',
    brand: 'nexus',
    ports: ['usb']
  }, {
    type: 'computer',
    color: 'spacegray',
    brand: 'apple',
    ports: ['usb', 'lightning', 'hdmi']
  }]
};

exports['should fetch correct value'] = function(test) {
  test.expect(16);

  test.strictEqual(propByString.get('name', testObject), testObject['name'], 'should fetch correct property value');
  test.strictEqual(propByString.get('age', testObject), testObject['age'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings', testObject), testObject['belongings'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[0]', testObject), testObject['belongings'][0], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[1]', testObject), testObject['belongings'][1], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[0].type', testObject), testObject['belongings'][0]['type'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[0].color', testObject), testObject['belongings'][0]['color'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[0].brand', testObject), testObject['belongings'][0]['brand'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[1].type', testObject), testObject['belongings'][1]['type'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[1].color', testObject), testObject['belongings'][1]['color'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[1].brand', testObject), testObject['belongings'][1]['brand'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[0].ports', testObject), testObject['belongings'][0]['ports'], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[0].ports[0]', testObject), testObject['belongings'][0]['ports'][0], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[1].ports[0]', testObject), testObject['belongings'][1]['ports'][0], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[1].ports[1]', testObject), testObject['belongings'][1]['ports'][1], 'should fetch correct property value');
  test.strictEqual(propByString.get('belongings[1].ports[2]', testObject), testObject['belongings'][1]['ports'][2], 'should fetch correct property value');

  test.done();
}

exports['should return undefined for missing values'] = function(test) {
  test.expect(18);

  test.strictEqual(propByString.get('names', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('name.age', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('name.age.name', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('age.age', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('age.name', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('age.name.age', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[]', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2]', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[3]', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2][0]', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2][1]', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2][50]', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2].age', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2].age.name', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2].age.name[1]', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2].age.name[50]', testObject), undefined, 'should return undefined');
  test.strictEqual(propByString.get('belongings[2].age.name[0]', testObject), undefined, 'should return undefined');

  test.done();
}

exports['should set correct value for strings'] = function(test) {
  test.expect(6);

  var updated;
  var update = 'hello world';

  updated = propByString.set('first', update, {});
  test.strictEqual(updated['first'], update, 'should be set correctly');
  updated = propByString.set('first.second', update, {});
  test.strictEqual(updated['first']['second'], update, 'should be set correctly');
  updated = propByString.set('first.second.third', update, {});
  test.strictEqual(updated['first']['second']['third'], update, 'should be set correctly');
  updated = propByString.set('first.second[0].third', update, {});
  test.strictEqual(updated['first']['second'][0]['third'], update, 'should be set correctly');
  updated = propByString.set('first.second[0].third', update, {
    first: {
      second: [{}]
    }
  });
  test.strictEqual(updated['first']['second'][0]['third'], update, 'should be set correctly');
  updated = propByString.set('first.second', update, {
    first: {
      second: [{}]
    }
  });
  test.strictEqual(updated['first']['second'], update, 'should be set correctly');

  test.done();
}

exports['should set correct value for numbers'] = function(test) {
  test.expect(6);

  var updated;
  var update = 5;

  updated = propByString.set('first', update, {});
  test.strictEqual(updated['first'], update, 'should be set correctly');
  updated = propByString.set('first.second', update, {});
  test.strictEqual(updated['first']['second'], update, 'should be set correctly');
  updated = propByString.set('first.second.third', update, {});
  test.strictEqual(updated['first']['second']['third'], update, 'should be set correctly');
  updated = propByString.set('first.second[0].third', update, {});
  test.strictEqual(updated['first']['second'][0]['third'], update, 'should be set correctly');
  updated = propByString.set('first.second[0].third', update, {
    first: {
      second: [{}]
    }
  });
  test.strictEqual(updated['first']['second'][0]['third'], update, 'should be set correctly');
  updated = propByString.set('first.second', update, {
    first: {
      second: [{}]
    }
  });
  test.strictEqual(updated['first']['second'], update, 'should be set correctly');

  test.done();
}

exports['should set correct value for arrays'] = function(test) {
  test.expect(6);

  var updated;
  var update = [1, 2, 3, 4];

  updated = propByString.set('first', update, {});
  test.strictEqual(updated['first'], update, 'should be set correctly');
  updated = propByString.set('first.second', update, {});
  test.strictEqual(updated['first']['second'], update, 'should be set correctly');
  updated = propByString.set('first.second.third', update, {});
  test.strictEqual(updated['first']['second']['third'], update, 'should be set correctly');
  updated = propByString.set('first.second[0].third', update, {});
  test.strictEqual(updated['first']['second'][0]['third'], update, 'should be set correctly');
  updated = propByString.set('first.second[0].third', update, {
    first: {
      second: [{}]
    }
  });
  test.strictEqual(updated['first']['second'][0]['third'], update, 'should be set correctly');
  updated = propByString.set('first.second', update, {
    first: {
      second: [{}]
    }
  });
  test.strictEqual(updated['first']['second'], update, 'should be set correctly');

  test.done();
}

exports['should set correct value for objects'] = function(test) {
  test.expect(6);

  var updated;
  var update = {
    first: 'hello',
    second: 'world'
  };

  updated = propByString.set('first', update, {});
  test.strictEqual(updated['first'], update, 'should be set correctly');
  updated = propByString.set('first.second', update, {});
  test.strictEqual(updated['first']['second'], update, 'should be set correctly');
  updated = propByString.set('first.second.third', update, {});
  test.strictEqual(updated['first']['second']['third'], update, 'should be set correctly');
  updated = propByString.set('first.second[0].third', update, {});
  test.strictEqual(updated['first']['second'][0]['third'], update, 'should be set correctly');
  updated = propByString.set('first.second[0].third', update, {
    first: {
      second: [{}]
    }
  });
  test.strictEqual(updated['first']['second'][0]['third'], update, 'should be set correctly');
  updated = propByString.set('first.second', update, {
    first: {
      second: [{}]
    }
  });
  test.strictEqual(updated['first']['second'], update, 'should be set correctly');

  test.done();
}
