const Product = require("../models/Product");
const Proudct = require("../models/Product");

const NewProducCreate = async(req,res)=> {
    const newProduct = new Proudct(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const ProductUpdate = async(req,res)=>{
    try{
        const UpdatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(UpdatedProduct)
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

const DeleteProduct = async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json( "Product Delete...")
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
const getAllProducts = async(req,res)=> {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
}

const getSingleProduct = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    NewProducCreate,
    ProductUpdate,
    DeleteProduct,
    getAllProducts,
    getSingleProduct
}