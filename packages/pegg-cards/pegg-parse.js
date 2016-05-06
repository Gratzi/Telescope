import Parse from 'parse/node';

const API_KEY = '0kR4j5fdjF4GpwitwZWvWeANkbWxb0z2FpkMZrLt'
const JS_KEY = 'zi4GohMKvjzNLSVVSZKC5NJVtMQr727oHJUYKzIz'
const MASTER_KEY = '7O5HajuGhoGMUBM0QrqmPDpO71xUkAG4yKnFuTno'

const PeggParse = () => {
  Parse.initialize(API_KEY, JS_KEY, MASTER_KEY);
}

PeggParse.prototype.test = () => {
  var TestObject = Parse.Object.extend("TestObject");
  var testObject = new TestObject();
  testObject.save({foo: "bar"})
  .fail(function (error) {
    console.error('OMG fail sauce');
    console.error(error);
  })
  .then(function(object) {
    console.log("yay! it worked");
    console.log(object);
  });
}

export default PeggParse;
