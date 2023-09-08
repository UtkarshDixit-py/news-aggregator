var mongoose = require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName:{
        type:String,
        required:[true,"FullName not provided"]
    },
    email:{
        type:String,
        unique:[true,"Email already registered"],
        lowercase:true,
        trim:true,
        required:[true,"Email not provided"],
        // validate:{
        //     validator: function(v){
        //         return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
        //     },
        //     message:"Email is incorrect or invalid"
        // }
    },
    password:{
        type:String,
        required:true
    },
    prefrences:{
        type:[String], //prefrences is an array of strings
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',userSchema);