const app = require('express').Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const multer = require('multer');
var user;

function fileFilter (req, file, cb) {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, + Date.now() + '-' + file.originalname )
  }
});

app.use(multer({dest: "public/img", storage, fileFilter}).single("avatar"))

app.get('/changepic', async(req, res) => {
  user = await userModel.findOne({_id: req.session.userID});
  const avatar =  user.imgURL
  // console.log(avatar);
  await res.render('changepic.ejs', {isLoggedIn: true, avatar});
});

app.post('/handleAvatar', async(req, res) => {
  // console.log(req.file);
  if (req.file == undefined) {
    res.redirect('/changepic')
  } else {
    await userModel.findByIdAndUpdate({_id: req.session.userID}, {imgURL: '/img/' + req.file.filename});
    res.redirect('/changepic')
  }
});

module.exports = app