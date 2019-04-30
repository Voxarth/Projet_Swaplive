router.get('/:idTchat', function (req, res, next) {
    //Afficher une conversation de la BDD
    // Connexion à la BDD pour aller chercher une conversation
    console.log({ _id: ObjectId(req.params.idTchat) })
    DB.collection('tchat').findOne({ _id: new ObjectId(req.params.idTchat) }, function (err, tchat) {
      if (err) throw err;

      DB.collection('msg').find({ idTchat: req.params.idTchat }).toArray(function (err, result) {
        if (err) throw err;
       res.json({
        usersId:"idUser",
        usersName:"name",
        usersLastname:"lastname"
       });
      });
    });
})