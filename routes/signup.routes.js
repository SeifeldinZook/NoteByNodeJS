const app = require('express').Router();
const signUpController = require('../controllers/signUpCont');
const { check, validationResult} = require('express-validator');
const userModel = require('../models/user.model');
var jwt = require('jsonwebtoken');

app.get('/signup', (req, res) => {
    res.render('signup.ejs', {error: [], oldValues: {fname:'', lname:'', email:'', password:''}, isLoggedIn: false})
});

app.post('/handleSignUp',
    check('fname').matches(/[a-z]*/),
    check('lname').matches(/[a-z]*/),
    check('email').isEmail(),
    check('password').notEmpty(),
    check('rePassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates the success of this synchronous custom validator
        return true;
    }),
    signUpController.handleSignUp
);

app.get('/verify/:token', (req, res) => {
    let token = req.params.token
    let decoded = jwt.verify(token, 'shhhhh');
    jwt.verify(token, 'shhhhh', async function(err, decoded) {
        console.log(decoded.email);
        await userModel.findOneAndUpdate({email: decoded.email}, {emailVerification: true})
    });
    res.redirect('/home')
});

module.exports = app 