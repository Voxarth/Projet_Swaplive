var express = require('express');
var router = express.Router();

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

/* POST new user*/

router.post('/', function(req, res, next) {
  //verifier les données en post
  //inserer les données dans la BDD
  //répondre au client avec l'id du compte
  res.send('respond with a resource');
});


// POUR SUPPRIMER UN UTILISATEUR
router.delete('/:id', function(req, res, next) {
// Récupérer req.params.id
// L'utiliser pour supprimé en BDD
// Puis dire à dire à l'utilisateur qu'il à bien supprimer son compte
  res.send('Votre compte à été supprimer');
});

module.exports = router;
