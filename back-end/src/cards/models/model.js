const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength:3,
      maxlength:25
    },
    description: {
      type: String,
      required: true,
      minlength:10,
      maxlength:100
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      minlength:9,
      maxlength:10
    },
    address: {
        type: String,
        required: true,
        minlength:10,
        maxlength:50
    },
    userID:{
          type:String,
          required: true
    }
  });

  const Card = mongoose.model("Card", cardSchema);

  module.exports= Card; 