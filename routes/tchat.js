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

    // Afficher la liste de toutes les conversations
    router.get('/', function (req, res, next) {
      var idUser = req.cookies.token;
      var user = connectedUsers.get(idUser);

      console.log(user);

      DB.collection('tchat').find({ users: user._id.toString() }).toArray(function (err, conversations) {
        DB.collection('users').find({ }).toArray(function (err, users) {
          if(err) throw err ;
          console.log(users)
         res.json({
            conversations: conversations,
            users:users
          })
         res.render('conversations', { title: 'SWAP-LIVE', conversations: conversations, users:users});
        })
      })
    });

    /**
@author Morgann 
Création d'une conversation
 **/
    router.post('/', function (req, res, next) {
      //verification des données
      console.log(req.body);

      var userId = connectedUsers.get(req.cookies.token)._id.toString();


      if (!req.body.users) {
        return res.send('list of users ?');
      }
      // creation de l'objet à enregistrer"
      var tchatAcreer = {
        users: req.body.users
      };
      //on ajoute l'utilisateur loggé si il n'est pas present dans la liste des utilisateurs
      if (tchatAcreer.users.indexOf(userId) === -1)
        tchatAcreer.users.push(userId);

      // completer les données
      if (req.body.name) {
        tchatAcreer.name = req.body.name;
      } else {
        tchatAcreer.name = "new tchat";
      }
      if (req.body.avatar) {
        tchatAcreer.avatar = req.body.avatar;
      } else {
        tchatAcreer.avatar = "avatar.jpeg";
      }
      //ajouter la base de donnee
      DB.collection('tchat').insertOne(tchatAcreer, function (err, result) {
        //reponse au client
        if (err) throw err;
        //console.log(result);
        // repondre au client avec idTchat
        res.json({
          message : 'OK',
          id : result.insertedId.toString()
        });
      })
    })

    /**
    @author Morgann 
    Afficher les paramètres
    **/
    router.get('/settings/:id', function (req, res, next) {
      //Afficher les paramètres de la conversation
      console.log(req.body);
      if (!req.body.idUser) {
        return res.send('list of users ?');
      }
      // creation de l'objet à enregistrer"
      var tchatParams = {
        idTchat: req.params.idTchat,
        idUser: req.params.idUser
      };
      // completer les données
      //   Modifier la taille des messages
      if (req.body.size) {
        tchatParams.size = req.body.size;
      }/* else {
    tchatParams.size = "Size (12, 16 ou 20)";
  }*/
      // Modifier le themes
     if (req.body.themes) {
       tchatParams.themes = req.body.themes;
     }else {
  /*tchatParams.themes = "dark / light";*/
  }
      //ajouter la base de donnee
      DB.collection('tchat').findOne(tchat, function (err, result) {
        // 'idTchat' = 'idTchat';
        // 'idUser' = 'idUser';
        // 'name' = 'name';
        // 'avatar' = 'avatar';
        if (err) throw err;
        res.json({
          result: 'OK',
          id: result.insertId.toString()
        })
      })
    })

    /**
    @author Morgann
    Supprimer une conversation
    **/
    router.delete('/:idTchat', function (req, res, next) {
      // Récupérer req.params.id
      // L'utiliser pour supprimé en BDD
      // Puis dire à l'utilisateur qu'il a bien supprimé la discution
      // Verification des données
      DB.collection('tchat').deleteOne({ _id: ObjectId(req.params.idTchat) }, function (err, result) {
        //reponse au client
        if (err) throw err;
        res.json({
          result: 'discution supprimer',
        })
      })
    })


    /** 
    
    @author G_G (Jérém)
    
    **/
    router.get('/:idTchat', function (req, res, next) {
      //Afficher une conversation de la BDD
      // Connexion à la BDD pour aller chercher une conversation
      console.log({ _id: ObjectId(req.params.idTchat) })
      DB.collection('tchat').findOne({ _id: new ObjectId(req.params.idTchat) }, function (err, tchat) {
        if (err) throw err;

        DB.collection('msg').find({ idTchat: req.params.idTchat }).toArray(function (err, result) {
          if (err) throw err;
          tchat.messages = result;
          res.json(tchat);
        })
      })
      // Réponse pour le client
      //res.send('Voici la conversation');
    })


    /** /
    * @author  Rachida
    Ajout d'une discussion
    **/
    router.post('/:idTchat', function (req, res, next) {
      var idTchat = req.params.idTchat;
      var newTchat = req.body;
      newTchat.idTchat = idTchat;
      newTchat.createdDate = new Date();
      if (!newTchat.msg) {
        return res.json({
          result:'pas de message'
        });
      }
      if (!newTchat.user) {
        return res.json({
          resut:'qui envoi le message ?'
        });
      }

      //ajouter la base de donnee
      DB.collection('msg').insertOne(newTchat, function (err, result) {
        //reponse au client
        if (err) throw err;
        res.json({
          result: 'OK',
          id: result.insertedId.toString()
        });
      })
    })

    /** /
    * @author  Rachida
    Supprimer un utilisateur d'une discussion
    DELETE /tchat/idDiscussion/idUser
    **/
    router.delete('/:idTchat/:iduser', function (req, res, next) {
      //res.send('Vous avez été banni de la discution');
      var idTchat = req.params.idTchat;
      var idUser = req.params.idUser;
      DB.collection('tchat').updateOne(
        { _id: ObjectId(idTchat) },
        { $pull: { users: idUser } },
        function (err, result) {
          //reponse au client
          if (err) throw err;
          res.json({
            result: 'OK',
            msg: 'utilisateur banni'
          })
        })
    })
  })

var connectedUsers = {};
module.exports = function (users) {
  connectedUsers = users;
  return router;
};
