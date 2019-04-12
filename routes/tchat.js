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
})

/** /
 * @author Morgann 
 * 
 **/
router.get('/settings/:id', function(req, res, next){
    //Afficher les paramètres de la conversation
    res.send('Voici les paramètres de la  conversation');
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
});

/** 

@author G_G (Jérém)

**/
router.get('/:id', function(req, res, next){
    //Afficher une conversation de la BDD
    res.send('Voici la conversation');

    // POUR LA CONNEXION A LA BDD
    var requiredProps = ['tchat'];
    for(var i in requiredProps) {
        if(typeof req.body[requiredProps[i]] == 'undefined'){
            console.log(requiredProps[i] + 'empty');
            return res.send(requiredProps[i] + 'empty');
        }
    }

    DB.collection('tchat').insertOne(req.body, function(err, result){
        if(err) throw err;
        console.log(result);
        res.json({
            result : 'ok',
            id : result.insertedId.toString()
        });
    })
})



/** /
* @author  Rachida
Ajout d'une discussion
**/ 

router.post('/:id', function(req, res, next) {
    
console.log(req.body)
console.log(req.params.id)

 var body = req.body ;
 body.idtchat = req.params.id;
 body.createdDate = new Date();

var requiredProps = [ 'msg','user' ]
for(var i in requiredProps){
  if(typeof body[requiredProps[i]] == 'undefined'){
    console.log(requiredProps[i]+'empty');
    return res.send(requiredProps[i]+'empty');
  }
}
 //ajouter la base de donnee
DB.collection('msg').insertOne(body, function(err, result){
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
* @author  Rachida
Supprimer un utilisateur d'une discussion
**/
router.put('/:id', function(req, res, next) {
    res.send('Vous avez été banni de la discution');

    if(!req.body.tchat)
        res.write('');
      });
    });

    
module.exports = router;