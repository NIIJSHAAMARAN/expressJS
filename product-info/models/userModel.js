const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    productname:String,
    price:String,
    description:String,
});
const User=mongoose.model('products',userSchema);
module.exports=User;