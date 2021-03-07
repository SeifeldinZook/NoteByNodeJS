const app = require('express').Router();
const signInController = require('../controllers/signInCont')

app.get('/signin', signInController.signIn)
app.post('/handleSignin', signInController.handleSignIn);

module.exports = app