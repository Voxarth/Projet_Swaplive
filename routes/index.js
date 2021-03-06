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

    /**** Page accueil *****/
    router.get('/', function (req, res, next) {
      res.render('index', { title: 'SWAP-LIVE' });
    });

    /* Page de connexion */
    router.get('/connexion', function (req, res, next) {
      res.render('connexion', { title: 'SWAP-LIVE' });
    });

    // Page de création de compte
    router.get('/createCompte', function (req, res, next) {
      res.render('createCompte', { title: 'SWAP-LIVE' });
    });
    
    
    /*****se loguer au compte (je l'ai  fait à ma sauce)
       **@author romain */

    router.post('/login', function (req, res, next) {
     //vérifier les données reçu en POST.
    var requiredProps = ['password', 'email'];
    for (var i in requiredProps) {
      if(typeof req.body[requiredProps[i]] == 'undefined'){
        console.log(requiredProps [i] + 'empty');
        return res.send(requiredProps[i] + 'empty');
      }
    }
      //inserer les données reçu du logg dans la BDD.
      DB.collection('users').findOne({email :req.body.email}, function (err, result){
        if (err) throw err;
        console.log(result);
        //réponse au client avec $id du compte.
        if (result == '' || result ==null){
          return res.send('Email non valide');
        }
        if (result.password != req.body.password || req.body.password == null){
          return res.send('Password error') ;
        }
        else{
          
          res.cookie('token', result._id.toString()) ;
          connectedUsers.set(result._id.toString(), result) ;
          res.json({
            result : 'connexion réussis YALLLLA',
            id : result._id.toString(),
            // name : result.name,
            // lastName : result.lastName,
            // email : result.email,
            // password : result.password
          });
        }
        });
        });

    /* GET  CGU. */
    router.get('/cgu', function (req, res, next) {
      res.render('cgu', { title: 'SWAPLIVE' });
    });
  });
var connectedUsers = {} ;
module.exports = function(users) {
  connectedUsers = users ;
  return router;
}