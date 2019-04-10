var express = require('express');
var router = express.Router();

/* GET accueil */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET  identification compte. */
router.post('/login', function(req, res, next) {
  res.render('login');
});

/* GET  CGU. */
router.get('/cgu', function(req, res, next) {
  res.render('cgu', { title: 'Express' });
});

module.exports = router;
