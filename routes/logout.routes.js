const app = require('express').Router();

app.get('/logout', (req, res) => {
  req.session.destroy((error)=>{
      res.redirect('/signin')
  })
});

module.exports = app