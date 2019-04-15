var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
  ObjectId = require('mongodb').ObjectId,
  url = "mongodb://localhost:27017/swaplive";

MongoClient.connect(url,
  { useNewUrlParser: true },
  function (err, client) {
    if (err) throw err;
    var DB = client.db('swaplive');

    /* Page accueil */
    router.get('/', function (req, res, next) {
      res.render('index', { title: 'SWAP-LIVE' });
    });

    // Page de création de compte
    router.get('/createCompte', function (req, res, next) {
      res.render('createCompte', { title: 'SWAP-LIVE' });
    });

    /**identification au compte
       **@author romain
      */
    router.post('/login', function (req, res, next) {
      res.render('login');
      //inserer les données dans la BDD
      DB.collection('users').findOne(req.body), function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
          result: 'ok',
          id: result.insertedId.toString()
        });
      }
    });

    /* GET  CGU. */
    router.get('/cgu', function (req, res, next) {
      res.render('cgu', { title: 'SWAPLIVE' });
    });
  });

module.exports = router;