var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require("../models/user");


var signUp = (req,res)=>{
    var user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        prefrences: req.body.prefrences,
        password: bcrypt.hashSync(req.body.password,8),
        
    })

    user.save()
        .then((data)=>{
            return res.status(200).send({
                message:"USER REGISTERED SUCCESSFULLY"
            })
        })
        .catch((err)=>{
                return res.status(500).send({
                    message: err.message || "Some Error occured while registering the user"
                })
        })
}
var signIn=(req,res)=>{
    const secret = process.env.API_SECRET;
    User.findOne({
        email:req.body.email
    }).then((user)=>{
        if(!user) return res.status(404).send({
            accessToken:null,
            message:"USER NOT FOUND PLEASE REGISER FIRST",
        });
        //if user is found in db
        var passwordIsVaild = bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsVaild){
            return res.status(401).send({
                accessToken:null,
                message:"INCORRECT PASSWORD"
            })
        }
        //if password is correct generate token
        var token = jwt.sign({id:user.id},secret,{expiresIn:86400});

        return res.status(200).send({
            user:{
                id:user.id,
                emai:user.email,
                username:user.fullName,
                prefrences:user.prefrences
            },
            message:"LOGIN SUCCESSFUL",
            accessToken: token
        })

    }).catch((err)=>{
        return res.status(500).send({
            message:err.message || "SOME ERROR HAS OCCURED WHILE RETRIEVING THE USER"
        })
    })
}

module.exports = {signUp,signIn};