var express = require('express');
var router = express.Router();


// POUR AFFICHER UNE CONVERSATION
router.get('/:id', function(req, res, next) {
    // Récupérer req.params.id
    // L'utiliser pour supprimé en BDD
    // Puis dire à dire à l'utilisateur qu'il à bien supprimer son compte
      res.send('Le message à afficher');
    });


// POUR SUPPRIMER UNE CONVERSATION
router.delete('/:id', function(req, res, next) {
    // Récupérer req.params.id
    // L'utiliser pour supprimé en BDD
    // Puis dire à dire à l'utilisateur qu'il à bien supprimer son compte
      res.send('Votre message à bien été supprimer');
    });

module.exports = app;