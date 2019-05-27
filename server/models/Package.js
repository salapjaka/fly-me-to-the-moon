
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  
  uid: String,
  profile:   Object,
  flightData: Object,
  content:    String,
  price:      Number
}, {
    timestamps: true
  });

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;




// docs { profile:
//   [0]    { _id: '5cec18d854e9e031cf0c8ab4',
//   [0]      email: 'yuliasivakova@mail.ru',
//   [0]      uid: 'IrgIJZwW5bhhYuDL5c9FBYvHdWq2',
//   [0]      createdAt: '2019-05-27T17:05:28.649Z',
//   [0]      updatedAt: '2019-05-27T17:05:28.649Z',
//   [0]      __v: 0 },
//   [0]   flightData:
//   [0]    { date: '2019-06-11T00:00:00',
//   [0]      to: 'Sydney',
//   [0]      from: 'Miami',
//   [0]      carrier: 'China Southern' },
//   [0]   content: 'docoococ',
//   [0]   price: '2222' }