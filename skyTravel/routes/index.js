const express = require('express');
const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Destinations page
router.get('/destinations', (req, res) => {
  res.render('destinations', { title: 'Destinations' });
});

// Contact page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
