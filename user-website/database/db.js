const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/user-website');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'MondoDB connection error:'));
db.once('open',()=>{
    console.log("Connected to MongoDB");
   
});
 module.exports=db;