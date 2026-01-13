var express=require('express');
var router=express.Router();
const User=require('../models/userModel');
const {validationResult,check}=require('express-validator');
router.get('/',function(req,res){
  res.render('product-info',{errors:[]});
});
router.post('/product-details',
  [check('productname').notEmpty().withMessage('Product Name is required'),
    check('price').notEmpty().isNumeric().withMessage("give a valid price"),
    check('description').notEmpty().withMessage('Give something about the product'),
  ],
  function (req, res) {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // Validation failed → re-render form with errors
        return res.render('product-info', {
          errors: errors.array(),
          productname:req.body.productname,
          price:req.body.price,
          description:req.body.description,
        });
      }
       // Validation success → save to DB
          const {productname, price,description } = req.body;
      
          const newUser = new User({
            productname,
            price,
            description,
          });

    newUser
      .save()
      .then(() => {
        res.render('form-data', {
          message: 'Product saved successfully!',
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
