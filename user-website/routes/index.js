var express = require('express');
var router = express.Router();
const User = require('../models/userModel');
const { validationResult, check } = require('express-validator');

/* GET user form page */
router.get('/', function (req, res) {
  res.render('user-form', { errors: [] });
});

/* POST create user with validation */
router.post(
  '/createUser',
  [
    check('email')
      .isEmail()
      .withMessage('Email is not valid'),

    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),

    check('username')
      .notEmpty()
      .withMessage('Username is required'),
  ],
  function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Validation failed → re-render form with errors
      return res.render('user-form', {
        errors: errors.array(),
        email: req.body.email,
        username: req.body.username,
      });
    }

    // Validation success → save to DB
    const { email, password, username } = req.body;

    const newUser = new User({
      email,
      password,
      username,
    });

    newUser
      .save()
      .then(() => {
        res.render('form-data', {
          message: 'Thank you',
          allData: req.body,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Database error');
      });
  }
);

module.exports = router;
