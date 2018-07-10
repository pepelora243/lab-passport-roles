
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router();
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  res.render('passport/signup');
});


router.post('/signup', (req, res, next) => {

  const {
    username,
    password
  } = req.body;

  User.findOne({
    username
  })
    .then(user => {
      console.log(user);
      if (user !== null) {
        throw new Error("Username Already exists");
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      let role;
      if (req.body.role) {
        role = req.body.role
      }
      const newUser = new User({
        username,
        password: hashPass,
        role: role
      });

      return newUser.save()
    })
    .then(user => {
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.render("passport/signup", {
        errorMessage: err.message
      });
    })
})

router.get('/login', (req, res, next) => {
  res.render('passport/login');
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
})
)

router.get(`/private/:id`,(req,res) =>{
  User.findByIdAndRemove(req.params.id, ()=> res.redirect("/private"));
})

module.exports = router;