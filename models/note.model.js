const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  userID: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
  NoteTitle: {type:String, required:true},
  NoteBody: {type:String},
  updated_at: {type: Date, default: Date.now}
});

let noteModel = mongoose.model('note', noteSchema) //name of model is always single

module.exports = noteModel;