const nock = require('nock')

function callafunction(){

    nock('http://www.example.com')
    .post('/login', 'username=pgte&password=123456')
    .reply(200, {id: '123ABC'})
}

QUnit.module('testing_api');
  
QUnit.test('Checking if api work', assert => {
    assert.equal(callafunction(), '509');
  });