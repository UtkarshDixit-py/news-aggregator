require("dotenv").config();

const bodyParser = require('body-parser')
const axios = require('axios');
const verifyToken = require("../middleware/authJWT");
const newsRoutes = require('express').Router();
const API_KEY = process.env.API_KEY;

newsRoutes.use(bodyParser.urlencoded({extended : false}));
newsRoutes.use(bodyParser.json());

newsRoutes.get('/',verifyToken,(req,res)=>{

  if(!req.user && req.message == null){
    res.status(403).send({
      message:"INVALID jwt token"
    })
  }
  else if(!req.user && req.message){
    res.status(403).send({
      message: req.message
    })
  }
    const prefrences = req.user.prefrences[0];
    axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.API_KEY}`;
    axios.get(`https://newsapi.org/v2/everything?q=${prefrences}&apiKey=${API_KEY}`)
  .then(response => {
    return res.status(200).send(response.data)
  })
  .catch(error => {
    console.error(error);
    res.status(404).send(error);
  });
 
})

module.exports = {newsRoutes}

//RESPONSE FROM NEWS API
// {
//     "status": "ok",
//     "totalResults": 11397,
//     "articles": [
//       {
//         "source": {
//           "id": "the-verge",
//           "name": "The Verge"
//         },
//         "author": "Justine Calma",
//         "title": "Can banks push Bitcoin to clean up its act?",
//         "description": "Banks and asset managers have a big stake in Bitcoin, so Greenpeace wants them to crack down on the cryptocurrency’s pollution.",
//         "url": "https://www.theverge.com/2023/7/11/23778688/bitcoin-energy-emissions-climate-change-banks-asset-managers-greenpeace",
//         "urlToImage": "https://cdn.vox-cdn.com/thumbor/ODx_QBV2qCE_dfhHtwtaZ8W6J8I=/0x0:7144x4743/1200x628/filters:focal(3572x2372:3573x2373)/cdn.vox-cdn.com/uploads/chorus_asset/file/24763884/1235926940.jpg",
//         "publishedAt": "2023-07-11T14:00:00Z",
//         "content": "Can banks push Bitcoin to clean up its act?\r\nCan banks push Bitcoin to clean up its act?\r\n / Banks and asset managers have a big stake in Bitcoin, so Greenpeace wants them to crack down on the crypto… [+4372 chars]"
//       }
//     ]
// }