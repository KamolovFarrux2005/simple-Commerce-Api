const { editOrder, newOrder, deleteOrder, getUserOrders, getAllOrder, incomeGet } = require("../controllers/order.controller");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middleware/verifyToken");

const router = require("express").Router();

router.post('/', verifyToken, newOrder);
router.put('/:id', verifyTokenAndAdmin, editOrder);
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);
router.get('/find/:userId', verifyTokenAndAuthorization, getUserOrders);
router.get('/', verifyTokenAndAdmin, getAllOrder);
router.get('/income', verifyTokenAndAdmin, incomeGet)
module.exports = router