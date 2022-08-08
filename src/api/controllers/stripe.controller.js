const stripe = require('stripe')(process.env.STRIPE_PK);


const stripePayment = async(req,res)=>{
    try {
        stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        }, (stripeErr, stripeRes)=>{
            if(stripeErr) res.status(500).json({error: stripeErr});
            res.status(200).json(stripeRes)
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    stripePayment
}