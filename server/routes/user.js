const userController = require('../controllers/user')
const router = require('koa-router')();

const user = router.post('/register', userController.register)
  .post('/login', userController.login);

module.exports = user;