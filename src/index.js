require("dotenv").config();
const express = require('express');
const app = express();
const PORT = 3002;
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('express').Router();
const {signUp,signIn} = require('./controllers/authController');
const {newsRoutes} = require('./routes/news');
const mongoose = require('mongoose');
const prefrencesRoute = require("./routes/prefrences");

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);


routes.use(bodyParser.urlencoded({extended : false}));
routes.use(bodyParser.json());

try{
  mongoose.connect("mongodb://localhost:27017/usersdbnews",{
    useUnifiedTopology:true,
    useNewUrlParser:true
  });
  console.log("connected to the db");
}catch(err){
  console.log("Error while connecting to db");
}

app.get('/', (req, res) => {
  res.send('hello world')
})

routes.post('/signIn',signIn);
routes.post('/register',signUp);

routes.use('/news',newsRoutes);
routes.use('/prefrences',prefrencesRoute);

app.listen(PORT,(err)=>{
    if(!err) console.log(`SERVER RUNNING ON PORT ${PORT}`);
    else console.log(err);
})

