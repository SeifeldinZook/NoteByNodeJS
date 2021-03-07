const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const port = 3000;
// const multer = require('multer');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const store = new MongoDBStore({
  uri: 'mongodb+srv://Zook:admin@cluster0.dcakn.mongodb.net/notesByNodeJS',
  collection: 'mySessions'
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store
}));

app.use(flash());
app.set('view engine', 'ejs');
app.use(require('./routes/signup.routes'));
app.use(require('./routes/signin.routes'));
app.use(require('./routes/home.routes'));
app.use(require('./routes/changepassword'));
app.use(require('./routes/logout.routes'));
app.use(require('./routes/changepic'));
app.use(require('./routes/emailverification'));
app.use(require('./routes/forgetpassword'));

mongoose.connect('mongodb+srv://Zook:admin@cluster0.dcakn.mongodb.net/notesByNodeJS', {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));
