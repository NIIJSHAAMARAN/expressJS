var express = require('express');
var router = express.Router();
const product = require('../models/userModel');
const { validationResult, check } = require('express-validator');

/* GET user form page */
router.get('/', function (req, res) {
  res.render('product-form', { errors: [] });
});

/* POST create user with validation */
router.post(
  '/addProduct',
  [
    check('productname')
      .notEmpty()
      .withMessage('please enter product name'),

    check('quantity')
      .notEmpty().isNumeric()
      .withMessage('please enter a valid quantity'),

    check('price')
      .notEmpty().isNumeric()
      .withMessage('please enter a valid price'),
  ],
  function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Validation failed → re-render form with errors
      return res.render('product-form', {
        errors: errors.array(),
        productname: req.body.productname,
        quantity: req.body.quantity,
        price:req.body.price,
      });
    }

    // Validation success → save to DB
    const {productname,quantity,price } = req.body;

    const newProduct = new product({
      productname,
      quantity,
      price,
    });

    newProduct
      .save()
      .then(() => {
        res.render('form-data', {
          message: 'Data Saved to product DB',
          allData: req.body,
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Database error');
      });
  }
);
// for getting data from db
router.get('/getProduct', function (req,res) {
    product.find().then(data => {
      res.render('index', {data:data,totalProducts: data.length})

    }).catch(error => {
      console.error(error);
      
    });
  });

module.exports = router;
