const PARSE_API_KEY = process.env.PARSE_API_KEY
const PARSE_JS_KEY = process.env.PARSE_JS_KEY
const PARSE_MASTER_KEY = process.env.PARSE_MASTER_KEY
if (!PARSE_API_KEY) throw new Error("cannot have an empty PARSE_API_KEY")
if (!PARSE_JS_KEY) throw new Error("cannot have an empty PARSE_JS_KEY")
if (!PARSE_MASTER_KEY) throw new Error("cannot have an empty PARSE_MASTER_KEY")

Parse = Npm.require("parse/node")

class PeggParse {
  constructor() {
    Parse.initialize(PARSE_API_KEY, PARSE_JS_KEY, PARSE_MASTER_KEY)
  }

  test(card, cb) {
    console.log("testing parse")
    // console.log("PARSE_API_KEY", PARSE_API_KEY)
    // console.log("PARSE_JS_KEY", PARSE_JS_KEY)
    // console.log("PARSE_MASTER_KEY", PARSE_MASTER_KEY)
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
  publishCardToParse: function (card) {
    if(Users.is.adminById(this.userId)) {
      let parseTestSync = Meteor.wrapAsync(parse.test, parse)
      return parseTestSync(card)
    }
  }
})
