var express = require('express');
var router = express.Router();

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
router.get('/:id', function(req, res, next){
    //Afficher une conversation de la BDD
    res.send('Voici la conversation');
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
})

/** /
* @author  Rachida
Ajout d'une discussion
**/
router.post('/:id', function(req, res, next) {
    res.send('Vous avez été ajouter');
});

/** /
* @author  Rachida
Supprimer un utilisateur d'une discussion
**/
router.put('/:id', function(req, res, next) {
    res.send('Vous avez été banni de la discution');

    if(!req.body.tchat)
        res.write('');
});
    
module.exports = router;