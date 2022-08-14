var express = require('express');
var router = express.Router();
const userService = require('../services/users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(422).json({error: error});
  }
  
});

router.post('/', async function(req, res, next) {
  try {
    const user = await userService.addUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(422).json({error: error});
  }
    
});

router.get('/:id', async function(req, res, next) {
  let userId = req.params.id;
  try {
    const user = await userService.getUser(userId);
    res.json(user);
  } catch (error) {
    res.status(422).json({error: error});
  }
});

router.patch('/:id', async function(req, res, next) {
  let userId = req.params.id;
  try {
    const user = await userService.editUser(userId, req.body);
    res.json(user);
  } catch (error) {
    res.status(422).json({error: error});
  }
});

router.delete('/:id', async function(req, res, next) {
  let userId = req.params.id;
  try {
    const user = await userService.deleteUser(userId);
    res.json(user);
  } catch (error) {
    res.status(422).json({error: error});
  }
});

module.exports = router;
