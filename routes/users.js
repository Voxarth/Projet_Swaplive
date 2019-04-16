var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
/**
 * @author Voxarth
 * ajout de MongoDB 
 */
var MongoClient = require('mongodb').MongoClient,
  url = "mongodb://localhost:27017/swaplive";

MongoClient.connect(url,
  { useNewUrlParser: true },
  function (err, client) {
    if (err) throw err;
    var DB = client.db('swaplive');
    console.log('Je suis connecté.');


    /* GET users listing. */
    router.get('/', function (req, res, next) {
      res.send('respond with a resource');
    });


    /**Création d'un nouveau compte
     **@author romain
    */
    router.post('/', function (req, res, next) {
      //console.log(req.body);

      //verifier les données en post
      if (!req.body.name) {
        return res.send('merci de renseigner votre nom');
      }
      if (!req.body.lastName) {
        return res.send('merci de renseigner votre prénom');
      }
      if (!req.body.email) {
        return res.send('merci de renseigner votre email');
      }
      if (!req.body.password) {
        return res.send('merci de renseigner votre mot de passe');
      }

      //inserer les données dans la BDD
      DB.collection('users').insertOne(req.body, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
          result: 'ok',
          id: result.insertedId.toString()
        });
      });

    });

    /**
    @author G_G (Jérém)
    **/
    // POUR MODIFIER UN UTILISATEUR
    router.put('/:id', function (req, res, next) {
      // Récupérer req.params.id
      // L'utiliser pour modifier en BDD le compte
      // Puis dire à dire à l'utilisateur qu'il à bien modifier son compte
      
      
      DB.collection('users').updateOne({_id:ObjectId(req.params.id)},{_id:ObjectId(req.params.id)}, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json({
          result: 'Compte bien modifier',
          id: result.insertedId.toString()
        });
      });
      res.send('Votre compte à été modifier');
    });

    /**
    @author G_G (Jérém)
    **/
    // POUR SUPPRIMER UN UTILISATEUR
    router.delete('/:id', function (req, res, next) {
      // Récupérer req.params.id
      // L'utiliser pour supprimé en BDD le compte
      // Puis dire à dire à l'utilisateur qu'il à bien supprimer son compte
        // var idUsers = req.params.id;

      DB.collection('users').deleteOne({_id:ObjectId(req.params.id)}, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json({
          result: 'Compte bien supprimer'
        });
      });
    });
    
  });


module.exports = router;