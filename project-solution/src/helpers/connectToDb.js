const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost/business_card_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("connected to MongoDb!"))
.catch(error => console.error(`could not connect to mongoDb: ${error}`));
