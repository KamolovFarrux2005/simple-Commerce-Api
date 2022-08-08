const router = require("express").Router();
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require("../middleware/verifyToken");
const {getUserCart, DeleteCart, CartUpdate, NewCartCreate, getAllCart} = require('../controllers/cart.controller')


// get user cart
router.get('/find/:userId', verifyTokenAndAuthorization, getUserCart);
//cart edit
router.put('/:id', verifyTokenAndAuthorization, CartUpdate);
// new cart
router.post('/', verifyToken, NewCartCreate)
// delete cart
router.delete('/:id', verifyTokenAndAuthorization, DeleteCart)
// admin get all user cart
router.get('/', verifyTokenAndAdmin, getAllCart)

module.exports  =  router;