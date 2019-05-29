const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight')
const User = require('../models/User')
const Package=require('../models/Package')
/* GET home page */

router.get('/', (req, res, next) => {
  res.json({ location: "HOME PAGE" })
});




router.get('/profile/:uid', (req,res,next) => { //Gets the user from the database 
  User.findOne({
    uid:req.params.uid
  }).then(ProfileFromDb=>{
    res.json(ProfileFromDb)
  })
})

router.get('/flightdetails', (req, res, next) => { //gets the flight from the database 
  var query = req.query,
    update = { visited: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  Flight.findOneAndUpdate(query, update, options, function (error, result) { //if no flight then create one 
    if (error) return;
    res.json({ details: result })
    // do something with the document
  });

});


router.post('/flightdetails', (req, res, next) => { //Saves a user to the flight 
  console.log('ininininini',req.body)
  let pass = req.body
  var query = req.query,
    update = { $addToSet : { passengers: pass } }
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  Flight.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) return;
    res.json({ details: result })
    // do something with the document
  });

})


router.post('/profile', (req, res, next)=>{
  console.log('docs', req.body)
  Package.create(req.body).then(packageFromDb=>{
    res.json(packageFromDb)
  })
  
})


router.get('/allMyStuff/:uid', (req,res,next) => {
  console.log('allMyStuffallMyStuffallMyStuffallMyStuffallMyStuffallMyStuff',req.params)
  //if(!req.params.uid){ return res.end() }
  let uid=req.params.uid
  let promise1 = Package.find({uid})
  let promise2 = Package.find( {"profile.uid": req.params.uid} )
  let promise3 = Flight.find( {passengers :  { $elemMatch: { uid:  req.params.uid}  } })
  
  Promise.all([promise1, promise2, promise3]).then(data=>{
    console.log('in here ',data)
    res.json({myPacks:data[0], packsICarry:data[1], myFlights: data[2]})
  })
})

module.exports = router;
