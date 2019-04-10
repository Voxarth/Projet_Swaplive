var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
    //Ajout d'une discution
    //Ajout dans la BDD
    //Puis dire à l'utilisateur qu'il a créé la discution
    res.send("Votre discution viens d'être créer");
})

router.get('/:id', function(req, res, next){
    //Voir les paramètres d'une discution
    res.send('Voici les paramètres de la discution');
})


router.delete('/:id', function(req, res, next) {
    // Récupérer req.params.id
    // L'utiliser pour supprimé en BDD
    // Puis dire à l'utilisateur qu'il a bien supprimé la discution
      res.send('Votre discution à bien été supprimer');
    });

router.post('/:id', function(req, res, next) {
    res.send('vous avez été ajouté');
});


router.put('/:id', function(req, res, next) {
    res.send('vous avez été banni de la discution');

    if(!req.body.tchat)
        res.write('');
});
    
module.exports = app;