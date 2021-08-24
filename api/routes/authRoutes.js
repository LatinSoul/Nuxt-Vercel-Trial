const { Router } = require('express')
const authCtrl = require('../controllers/authCtrl')

const router = Router()
// Getter Routes
// "/register" route is not in use.
// router.get('/register', authCtrl.register_get)
// router.get('/login', authCtrl.login_get)
router.get('/logout', authCtrl.logout)

// Setter Routes
router.post('/register', authCtrl.register)
// this "get /login" route is not in use.
router.post('/login', authCtrl.login)
// users routes moved to userRoute.js
// router.get('/user', authCtrl.user)
// router.put('/user', authCtrl.user_put)
// router.patch('/user', authCtrl.user_patch)

module.exports = router