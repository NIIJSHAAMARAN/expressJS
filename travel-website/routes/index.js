var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
var places=
[
  {
    "name": "Paris",
    "country": "France",
    "isPopular": true
  },
  {
    "name": "Kyoto",
    "country": "Japan",
    "isPopular": true
  },
  {
    "name": "Reykjavik",
    "country": "Iceland",
    "isPopular": false
  }
]
var greet="Welcome to  Travel Website!!! Explore amazing destinations around the world."

  res.render('index', { greet:greet,places:places });
});

module.exports = router;
