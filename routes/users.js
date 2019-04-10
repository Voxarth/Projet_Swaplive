var express = require('express');
var router = express.Router();

  /* GET users listing. */
  router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

/* POST new user*/
/**
 **@author romain
 */
router.post('/', function(req, res, next) {
  //console.log(req.body);
  
  //verifier les données en post
  if (!req.body.name){
    return res.send('merci de renseigner votre nom');
  }
  if (!req.body.lastName){
    return res.send('merci de renseigner votre prénom');
  }
  if  (!req.body.email){
      return res.send('merci de renseigner votre email');
  //inserer les données dans la BDD
  //répondre au client avec l'id du compte
  }
  res.send('ok  compte enregistrer');
});


// POUR MODIFIER UN UTILISATEUR
router.put('/:id', function(req, res, next) {
  // Récupérer req.params.id
  // L'utiliser pour supprimé en BDD
  // Puis dire à dire à l'utilisateur qu'il à bien supprimer son compte
    res.send('Votre compte à été modifier');
  });


// POUR SUPPRIMER UN UTILISATEUR
router.delete('/:id', function(req, res, next) {
// Récupérer req.params.id
// L'utiliser pour supprimé en BDD
// Puis dire à dire à l'utilisateur qu'il à bien supprimer son compte
  res.send('Votre compte à été supprimer');
});

module.exports = router;
