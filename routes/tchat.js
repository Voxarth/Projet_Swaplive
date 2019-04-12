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

/** /
 * @author Morgann 
 **/
router.post('/', function(req, res, next){
    //Ajout d'une discution
    //Ajout dans la BDD
    //Puis dire à l'utilisateur qu'il a créé la discution
    res.send("Votre discution viens d'être créer");

    var body = req.body ;
    body.name = req.params.id;
    body.avatar = req.params.id;
    body.idUser = req.params.id;
   
   var requiredProps = [ 'name','avatar','idUser' ]
   for(var i in requiredProps){
        if(typeof body[requiredProps[i]] == 'undefined'){
            console.log(requiredProps[i]+'empty');
            return res.send(requiredProps[i]+'empty');
        }
    }
    //ajouter la base de donnee
    DB.collection('tchat').insertOne(body, function(err, result){
        //reponse au client
        if(err) throw err;
        console.log(result);
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

    var body = req.body ;
    body.idTchat = req.params.id;
    body.name = req.params.id;
    body.avatar = req.params.id;
    body.idUser = req.params.id;
   
   var requiredProps = [ 'idTchat','name','avatar','idUser' ]
   for(var i in requiredProps){
        if(typeof body[requiredProps[i]] == 'undefined'){
            console.log(requiredProps[i]+'empty');
            return res.send(requiredProps[i]+'empty');
        }
    }
    //ajouter la base de donnee
    DB.collection('tchat').findOne(body, function(err, result){
        //reponse au client
        if(err) throw err;
        console.log(result);
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
router.delete('/:id', function(req, res, next) {
    // Récupérer req.params.id
    // L'utiliser pour supprimé en BDD
    // Puis dire à l'utilisateur qu'il a bien supprimé la discution
    res.send('Votre discution à bien été supprimer');

    var body = req.body ;
    body.idTchat = req.params.id;
    body.name = req.params.id;
    body.avatar = req.params.id;
    body.idUser = req.params.id;
   
   var requiredProps = [ 'idTchat','name','avatar','idUser' ]
   for(var i in requiredProps){
        if(typeof body[requiredProps[i]] == 'undefined'){
            console.log(requiredProps[i]+'empty');
            return res.send(requiredProps[i]+'empty');
        }
    }
    //ajouter la base de donnee
    DB.collection('tchat').deleteOne(body, function(err, result){
        //reponse au client
        if(err) throw err;
        console.log(result);
        res.json({
            result : 'OK',
            id : result.insertedId.toString()
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
    var messageAenregistrer = req.body ;
    messageAenregistrer.idTchat = idTchat ;
    messageAenregistrer.createdDate = new Date() ;
    if(!messageAenregistrer[msg]) {
      return res.send('pas de message') ;
    }
    if(!messageAenregistrer[user]) {
      return res.send('qui envoi le message ?') ;
    }

    //ajouter la base de donnee
    DB.collection('msg').insertOne(messageAenregistrer, function(err, result){
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
});

module.exports = router;