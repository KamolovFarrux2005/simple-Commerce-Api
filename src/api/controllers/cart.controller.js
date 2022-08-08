const Cart = require("../models/Cart");

const NewCartCreate = async(req,res)=> {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const CartUpdate = async(req,res)=>{
    try{
        const UpdatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(UpdatedCart)
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

const DeleteCart = async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Delete....")
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
const getAllCart = async(req,res)=> {
   try {
    const carts = await Cart.find();
    res.status(200).json(carts)
   } catch (error) {
       res.status(500).json({
        error: error.message
       })
   }
}

const getUserCart = async(req,res)=>{
    try {
        const cart = await Cart.findOne({userId:  req.params.userId});
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};



module.exports = {
    NewCartCreate,
    getUserCart,
    DeleteCart,
    CartUpdate,
    getAllCart,
}