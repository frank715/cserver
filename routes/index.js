var express = require('express');
const { downloadFiles } = require('../middlewares/user.middleware');
var router = express.Router();

/* GET home page. */

router.get('/downloads', downloadFiles);

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
