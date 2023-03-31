// This is just a random function we are calling
// the important part is that it needs to return something
// back to the testing framework.
//
// In this case we are returning back the number 3, which is what the assert
// is looking for on line 23.
// This function is often used as the base to call another page that returns 
// something such as the api pages that return database content
// or something we can validate against.
//
function add(first, second){

    return 3;
  
  }
  
  QUnit.module('add');
  
  QUnit.test('adding two numbers together', assert => {
      assert.equal(add(1, 2), 3);
    });