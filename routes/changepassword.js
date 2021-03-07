const app = require('express').Router();
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const userModel = require('../models/user.model');

app.get('/changepassword', async(req, res) => {
  var user = await userModel.findOne({_id: req.session.userID });
  const avatar =  user.imgURL
  await res.render('changepassword.ejs', {error: [], isLoggedIn: true, oldValues: '', avatar});
});

app.post('/handleChangePassword', 
  check('currPassword').notEmpty(),
  check('newPassword').notEmpty(),
  check('rePassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
          throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
  }),  
  async (req, res) => {
    const currPassword = req.body.currPassword;
    const newPassword = req.body.newPassword;
    var user = await userModel.findOne({_id: req.session.userID });
    const avatar =  user.imgURL
    const match = await bcrypt.compare(currPassword, user.password)
    const error = validationResult(req);
    console.log(error);
    if (match) {
      if (error.isEmpty()) {
        bcrypt.hash(newPassword, 7, async (err, hash) => {
          await userModel.findByIdAndUpdate({_id: req.session.userID}, {password: hash})
          res.redirect('/logout')
        })
      } else {
        await res.render('changepassword.ejs', {error: error.array(), isLoggedIn: true, oldValues: {currPassword, newPassword}, avatar});
      }
    } else {
      await res.render('changepassword.ejs', {error: [{ param: 'incorrectPass' }], isLoggedIn: true, oldValues: {currPassword, newPassword:''}, avatar});
    }
  }
);

module.exports = app
