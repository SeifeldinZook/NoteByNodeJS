const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const userModel = require('../models/user.model');

module.exports.signIn = (req, res) => {
    if (req.flash('flashEmail')[0] == 'false') {
        isEmail = false
        isMatch = true
        isEmailVerified = false
        notRegEmail = req.flash('email')[0]        
    } else if (req.flash('flashPassword')[0] == 'false') {
        isEmail = true
        isMatch = false
        isEmailVerified = false
        notRegEmail = req.flash('email')[0]
    } else if (req.flash('emailVerification')[0] == 'false') {
        isEmail = true;
        isMatch = true;
        isEmailVerified = false
        notRegEmail = req.flash('email')[0]
    } else {
        isEmailVerified = true
        isEmail = true;
        isMatch = true;
        notRegEmail = '';
    }
    res.render('signin.ejs', { isMatch, isEmail, isLoggedIn: false, notRegEmail, isEmailVerified });
};

module.exports.handleSignIn = async (req, res) => {
    var { email, password } = req.body;
    var user = await userModel.findOne({ email })
    if (user != null) {
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            req.session.userID = user._id;
            req.session.userFN = user.fname;
            req.session.isLoggedIn = true;
            var hour = 1000 * 60 * 60 * 24;      // 24 hours
            req.session.cookie.expires = new Date(Date.now() + hour)
            // req.session.cookie.maxAge = hour;
            if (user.emailVerification == false) {
                req.flash('emailVerification', "false")
                req.flash('email', email);
                res.redirect('/signin')
            }
            else {
                res.redirect('/home')
            }
        } else {
            req.flash('flashPassword', 'false')
            req.flash('email', email);
            res.redirect('/signin')
        }
    } else {
        req.flash('flashEmail', 'false');
        req.flash('email', email);
        res.redirect('/signin')
    }
}