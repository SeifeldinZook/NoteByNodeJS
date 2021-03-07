const app = require('express').Router();
const auth = require('../authentication/auth');
const noteModel = require('../models/note.model');
const userModel = require('../models/user.model');
app.get('/', (req, res) => {
    res.redirect ('/home')
});

app.get('/home', auth, async(req, res) => {
    // res.json(await noteModel.find({}).populate('userID', '-password'))  (for learning)
    const UserNotes = await noteModel.find({userID: req.session.userID});
    var user = await userModel.findOne({_id: req.session.userID});
    const avatar =  user.imgURL
    console.log(req.session);
    await res.render('home.ejs', {name: req.session.userFN, isLoggedIn: true, UserNotes, avatar});
});

app.post('/addNote', async(req, res) => {
    const NoteTitle = req.body.title;
    const NoteBody = req.body.note;
    await noteModel.insertMany({userID: req.session.userID, NoteTitle, NoteBody})
    res.redirect('/home')
});

app.post('/delete', async(req, res) => {
    await noteModel.findByIdAndDelete({_id: req.body.noteID});
    res.redirect('/home')
});

app.post('/editNote', async(req, res) => {
    await noteModel.findByIdAndUpdate({_id: req.body.noteID2}, {NoteTitle:req.body.NoteTitle, NoteBody:req.body.NoteBody});
    res.redirect('/home')
});

app.post('/deleteaccount', async(req, res) => {
    await userModel.findByIdAndDelete({_id: req.session.userID })
    req.session.destroy((error)=>{
        res.redirect('/signin')
    })
});

module.exports = app
