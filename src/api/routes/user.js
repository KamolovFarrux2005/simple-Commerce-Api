const router = require('express').Router();
const { UserUpdate, getAllUser, deleteUser, getSingleUser, getStats } = require('../controllers/user.controller.js');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken} = require('../middleware/verifyToken.js');

router.get('/', verifyTokenAndAdmin, getAllUser);
router.get('/find/:id', verifyTokenAndAdmin, getSingleUser);
router.get('/stats', verifyTokenAndAdmin, getStats);
router.put('/:id', verifyTokenAndAuthorization, UserUpdate);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser)


module.exports = router;