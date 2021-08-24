const { Router } = require('express')
const userCtrl = require('../controllers/userCtrl')

const router = Router()
router.get('/', userCtrl.user_get)
// the "/register" route is used instead of the this /user route. 
// router.post('/', userCtrl.user_post)
// router.put('/:id', userCtrl.user_put)
// router.patch('/:id', userCtrl.user_patch)
// router.patch('/:id', userCtrl.user_del)

module.exports = router