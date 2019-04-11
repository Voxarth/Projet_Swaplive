var express = require('express');
var router = express.Router();
var MongoClient=require('mongodb').MongoClient,
  ObjectId =require('mongodb').ObjectId,
 url= "mongodb://localhost:27017/swaplive";

 MongoClient.connect(url,
    {useNewUrlParser:true},
    function(err,client){
        if(err) throw err;
        var DB = client.db('swaplive');

/* GET accueil */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SAWPLIVE' });
});
/* GET  identification compte. */
router.post('/login', function(req, res, next) {
  res.render('login');
});

/* GET  CGU. */
router.get('/cgu', function(req, res, next) {
  res.render('cgu', { title: 'SWAPLIVE' });
});
});

module.exports = router;
