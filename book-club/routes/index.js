var express = require('express');
var router = express.Router();
const {validationResult,check}=require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { errors: [] });
});
router.post('/createUser',[
  check('email').isEmail().withMessage("Email must be in valid email format"),
  check('password').isLength({min:8}).withMessage('Password must be at least 8 characters long'),
  check('name').notEmpty().withMessage("Name must not be empty.")
],function(req,res)
{
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    res.render('form',{errors:errors.array()});
  }
  else{
    res.render('form-data',{
      email:req.body.email,
      name:req.body.name,
      allData:req.body
    });
  }
});

module.exports = router;
