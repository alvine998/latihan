var express = require('express');
var router = express.Router();
const cUsers = require('../apps/controllers/user.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users/create', cUsers.create)

module.exports = router;
