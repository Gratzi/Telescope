const API_KEY = '0kR4j5fdjF4GpwitwZWvWeANkbWxb0z2FpkMZrLt'
const JS_KEY = 'zi4GohMKvjzNLSVVSZKC5NJVtMQr727oHJUYKzIz'
const MASTER_KEY = '7O5HajuGhoGMUBM0QrqmPDpO71xUkAG4yKnFuTno'

Parse = Npm.require("parse/node")

class PeggParse {
  constructor() {
    Parse.initialize(API_KEY, JS_KEY, MASTER_KEY)
  }

  test(cb) {
    console.log("testing parse")
    let TestObject = Parse.Object.extend("TestObject")
    let testObject = new TestObject()
    testObject.save({foo: "bar"})
    .fail(function (error) {
      console.error('OMG fail sauce')
      console.error(error)
      cb(error)
    })
    .then(function(object) {
      console.log("yay! it worked")
      console.log(object)
      cb(null, object)
    })
  }
}

parse = new PeggParse()

Meteor.methods({
  publishCardToParse: function () {
    if(Users.is.adminById(this.userId)) {
      let parseTestSync = Meteor.wrapAsync(parse.test, parse)
      return parseTestSync()
    }
  }
})
