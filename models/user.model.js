const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fname: {type:String, required:true},
  lname: {type:String, required:true},
  email: {type:String, unique:true, required:true},
  emailVerification: {type: Boolean, default: false},
  password: {type:String, required:true},
  imgURL: {type: String},
  updated_at: {type: Date, default: Date.now}
});

let userModel = mongoose.model('user', userSchema) //name of model is always single

module.exports = userModel;