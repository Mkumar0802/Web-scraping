const { MongoClient } = require("mongodb");
const  mongoose  = require('mongoose')


let MONGODB_URL="mongodb+srv://muthu-admin:muthu@cluster0.qs7be.mongodb.net/testdb?retryWrites=true&w=majority";
let MONGODB_NAME = "onlineshopping";

mongoose.connect(MONGODB_URL, { useNewUrlParser: true }) .then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));



let client = new MongoClient(MONGODB_URL);
let mongo = {
  db: null,
  products: null,
  async connect() {
    try {
      await client.connect();
      this.db = client.db(MONGODB_NAME);
      this.products = this.db.collection("products");
      console.log("Selected Database:-", MONGODB_NAME);
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = mongo;