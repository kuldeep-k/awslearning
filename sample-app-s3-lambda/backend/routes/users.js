var express = require('express');
var router = express.Router();

let users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

router.post('/', function(req, res, next) {
  let user = req.body;
  error = false;
  users.forEach((userRow) => {
    if(userRow.name === user.name) {
      error = true;
    }
  });

  if(!error) {
    users.push(user);
    res.json(users);
  } else {
    res.status(422).json({error: "Duplicate User"});
  }
    
});

router.get('/:id', function(req, res, next) {
  let userId = Number(req.params.id);
  console.log(userId)
  let user = null;
  users.forEach((userRow) => {
    if(userRow.id === Number(userId)) {
      user = userRow;
    }
  })
  res.json(user);
});

router.patch('/:id', function(req, res, next) {
  let userId = Number(req.params.id);
  let user = req.body;
  users = users.map((userRow) => {
    if(userRow.id === userId) {
      userRow = user;
    }
    return userRow;
  })
  res.json(users);
});

router.delete('/:id', function(req, res, next) {
  let userId = Number(req.params.id);
  users = users.filter((userRow) => {
    return userRow.id !== userId;
  })
  
  res.json(users);
});

module.exports = router;
