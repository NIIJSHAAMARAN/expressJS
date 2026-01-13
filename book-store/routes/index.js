var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var storeName="My Book Store"
  var books=[
    {'title':'The Alchemist','author':'Paulo Coelho'},

{'title':'Wings of Fire','author':' A. P. J. Abdul Kalam'},

{'title':'Harry Potter and the Philosopher’s Stone ','author':' J. K. Rowling'}
  ]

  res.render('index', { storeName:storeName,books:books });
});

module.exports = router;
