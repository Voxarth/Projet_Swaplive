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
    })

/** /
 * @author Morgann 
 **/
router.post('/', function(req, res, next){
    //verification des données
    if(!req.body.users){
      return res.send('list of users ?') ;
    }
    // creation de l'objet à enregistrer
    var tchatAcreer = {
      users : req.body.users
    } ;
    // completer les données
    if(req.body.name) {
      tchatAcreer.name = req.body.name ;
    } else {
      tchatAcreer.name = "new tchat" ;
    }
    if(req.body.avatar) {
      tchatAcreer.avatar = req.body.avatar ;
    } else {
      tchatAcreer.avatar = "avatar.jpeg" ;
    }
    //ajouter la base de donnee
    DB.collection('tchat').insertOne(tchatAcreer, function(err, result){
        //reponse au client
        if(err) throw err;
        //console.log(result);
        // repondre au client avec idTchat
        res.json({
            result : 'OK',
            id : result.insertedId.toString()
        });
    })
})

/** /
 * @author Morgann 
 * 
 **/
router.get('/settings/:id', function(req, res, next){
    //Afficher les paramètres de la conversation
    res.send('Voici les paramètres de la  conversation');
    var tchatParams = {
        idTchat : req.params.idTchat,
        idUser : req.params.idUser,
    };
    if(req.body.name) {
        tchatParams.name = req.body.name ;
    } else {
        tchatParams.name = "new tchat" ;
    }
    if(req.body.avatar) {
        tchatParams.avatar = req.body.avatar ;
    } else {
        tchatParams.avatar = "avatar.jpeg" ;
    } 
    //ajouter la base de donnee
    DB.collection('tchat').findOne(tchat, function(err, result){
        'idTchat' = 'idTchat';
        'idUser' = 'idUser';
        'name' = 'name';
        'avatar' = 'avatar';
        if(err) throw err;
        res.json({
            result : 'OK',
            id : result.insertId.toString()
        })
    })
})

/** /
 * @author Morgann 
 * 
 **/
router.delete('/:id', function(req, res, next) {
    // Récupérer req.params.id
    // L'utiliser pour supprimé en BDD
    // Puis dire à l'utilisateur qu'il a bien supprimé la discution
    res.send('Votre discution à bien été supprimer');

    var idTchat = req.params.idTchat;
    DB.collection('tchat').updateOne( 
      {_id:ObjectId(idTchat)},
      { $pull : {tchat : idTchat} },
      function(err, result){
        //reponse au client
        if(err) throw err;
        res.json({
          result : 'OK',
          msg : 'discution supprimer'
        });
    })
})


/** 

@author G_G (Jérém)

**/
router.get('/:id', function(req, res, next){
    //Afficher une conversation de la BDD
    res.send('Voici la conversation');

})


  /** /
  * @author  Rachida
  Ajout d'une discussion
  **/ 
  router.post('/:idTchat', function(req, res, next) {
    var idTchat = req.params.id ;
    var newTchat = req.body ;
    newTchat.idTchat = idTchat ;
    newTchat.createdDate = new Date() ;
    if(!newTchat[msg]) {
      return res.send('pas de message') ;
    }
    if(!newTchat[user]) {
      return res.send('qui envoi le message ?') ;
    }

    //ajouter la base de donnee
    DB.collection('msg').insertOne(newTchat, function(err, result){
        //reponse au client
      if(err) throw err;
      res.json({
        result : 'OK',
        id : result.insertedId.toString()
      });
    })
  })
  /** /
  * @author  Rachida
  Supprimer un utilisateur d'une discussion
  DELETE /tchat/idDiscussion/idUser
  **/
  router.delete('/:idTchat/:iduser', function(req, res, next) {
    //res.send('Vous avez été banni de la discution');
    var idTchat = req.params.idTchat;
    var idUser = req.params.iduser;
    DB.collection('tchat').updateOne( 
      {_id:ObjectId(idTchat)},
      { $pull : {users : idUser} },
      function(err, result){
        //reponse au client
        if(err) throw err;
        res.json({
          result : 'OK',
          msg : 'utilisateur banni'
        });
    })
})

module.exports = router;