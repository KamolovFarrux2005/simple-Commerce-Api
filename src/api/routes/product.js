const router = require('express').Router();
const {NewProducCreate, ProductUpdate, DeleteProduct, getAllProducts, getSingleProduct} = require("../controllers/product.controller")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleware/verifyToken")
router.post('/', verifyTokenAndAdmin, NewProducCreate);
router.put('/:id', verifyTokenAndAdmin, ProductUpdate);
router.delete('/:id', verifyTokenAndAdmin, DeleteProduct);
router.get('/', getAllProducts);
router.get('/find/:id', getSingleProduct)
module.exports = router;