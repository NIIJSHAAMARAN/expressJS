const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    productname:String,
    quantity:Number,
    price:Number,
});
const product=mongoose.model('products',userSchema);
module.exports=product;