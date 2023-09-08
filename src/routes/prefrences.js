const prefrencesRoute = require('express').Router();
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/authJWT');

const User = require('../models/user')

prefrencesRoute.use(bodyParser.urlencoded({extended:false}));
prefrencesRoute.use(bodyParser.json());


prefrencesRoute.get('/',verifyToken,(req,res)=>{
    // console.log("userID",req._id);
    res.status(200).send(req.user.prefrences);
})

prefrencesRoute.post('/',verifyToken,(req,res)=>{
    const newPrefrences =  req.body.newPrefrences;

    User.findOne({
        email:req.user.email
    }).then((user)=>{
            user.prefrences.push(...newPrefrences);
            user.save()
            return res.status(200).send("prefrences updated successfully")
        })
        .catch((err)=>{
            console.log(err);
            return res.status(401).send("error while updating prefrences")
        })
    

})


module.exports = prefrencesRoute;