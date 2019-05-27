const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  
  date:    String,
  to:      String,
  from:    String,
  carrier: String,
  visited: {type:Date},
  passengers: Array
}, {
    timestamps: true
  });

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;