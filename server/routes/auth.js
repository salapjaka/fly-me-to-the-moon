const express = require('express');
const router = express.Router();
const User = require("../models/User");


router.post("/api/newUser", (req, res, next) => {
  let { email, uid } = req.body;

  User.findOne({ uid })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        User.create({
          email,
          uid
        })
          .then(response => {
            res.json(response);
          });
      }
    });
});




module.exports = router;