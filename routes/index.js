const express = require('express');
const router  = express.Router();
const ensureBoss = require("../middleware/ensureLogin")
const user = require("../models/User")

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/private", ensureBoss("Boss"), (req,res) => {
  user.find({}).then(users =>{
    res.render("private",{users})
  })
  
})


module.exports = router;
