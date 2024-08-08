const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Registration",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   

}).then(()=>{
       console.log(`Connection Successfull:)`)
}).catch((e)=>{
     console.log(`No connection`)
})

const logInschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        max:24
    },
  
      email: {
        type: String,
        required:true,
        unique: true,
        trim:true,
        lowercase:true 
      },

    password:{
        type:String,
        required:true
    }

})
const logIncollection=new mongoose.model('logIncollection',logInschema)
module.exports=logIncollection
