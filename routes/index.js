var express = require('express');
var router = express.Router();
router.use(express.json());
router.use(express.urlencoded({
  extended: false
}));

router.get('/', function(req, res) {
  console.log("GET INDEX");
  res.render('index');
});

router.post('/', function(req, res) {
  console.log("POST INDEX");
  res.redirect('results');
});

module.exports = router;