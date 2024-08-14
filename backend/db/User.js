const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
     ThemeProject:String,
     Reason:String,
     Type:String,
     Division:String,
     Category:String,
     Priority:String,
     Department:String,
     StartDate:String,
     EndDate:String,
     Location:String,
     Status:String
});
module.exports=mongoose.model("products",UserSchema);