const bcrypt = require('bcrypt');
const { check, validationResult} = require('express-validator');
const userModel = require('../models/user.model');
const nodemailer = require("nodemailer");
const sendgridTransport = require('nodemailer-sendgrid-transport')
var jwt = require('jsonwebtoken');
require('dotenv').config();

// let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "zookdb@gmail.com", // generated ethereal user
//         pass: "", // generated ethereal password
//     },
// });

let transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key:`${process.env.sendGridApiKey}`
    },
}));

module.exports.handleSignUp = async (req, res) => {
    const {fname, lname, email, password} = req.body
    const error = validationResult(req);
    // console.log(error);
    if (error.isEmpty()) {
        const user = await userModel.findOne({email});
        if (user == null) {
            bcrypt.hash(password, 7, async (err, hash) => {

                var token = jwt.sign({email}, 'shhhhh', { expiresIn: 60*60 });

                let info = await transporter.sendMail({
                    from: '"NotesByNodeJS" <zookdb@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Email Verification ✔", // Subject line
                    html:
                    `
                    <h2>This is an automated message</h2>
                    <br>
                    <b>Your Email is:</b> <span>${email}</span>
                    <br>
                    <a href="https://notesbynodejs.herokuapp.com/verify/${token}">Please, Click to verify your Email</a>
                    `
                });
                await userModel.insertMany({fname, lname, email, password: hash, imgURL: '/img/userDefault.jpg'})
                res.redirect('/emailverification')
            });
        } else {
            res.render('signup.ejs', {error: [{ param: 'emailExists' }], oldValues: {fname, lname, email, password:''}, isLoggedIn: false})
        }
    } else {
        res.render('signup.ejs', {error: error.array(), oldValues: {fname, lname, email, password}, isLoggedIn: false});
    }
}