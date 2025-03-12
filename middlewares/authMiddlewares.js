const User = require("../models/User");

module.exports = (req,res,next) => {
  if(!req.session.userID) return res.redirect('/');
  
  User.findById(req.session.userID)
    .then(user => {
      if(!user) return res.redirect('/login');
      req.user = user;
      next();
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        status: 'fail',
        message: err.message,
        error: err.message
      });
    });
  
}