const { stripePayment } = require('../controllers/stripe.controller');

const router = require('express').Router();

router.post('/payment', stripePayment)

module.exports = router;