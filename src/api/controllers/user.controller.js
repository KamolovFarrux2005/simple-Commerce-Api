const User = require("../models/User");
const CryptoJS = require('crypto-js')
const UserUpdate = async(req,res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      }
    
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
}


const getAllUser = async(req,res)=>{
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
}

const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(`Delete success ${req.params.id}`)
    }catch(err){
      res.status(500).json(err);
    }
}

const getSingleUser = async(req,res)=>{
    try {
        const user = await User.find({_id: req.params.id}); 
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
}

const getStats = async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            {$match: {
                createdAt: {$gte: lastYear}
            }},
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                },
            },
            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    UserUpdate,
    getAllUser,
    deleteUser,
    getSingleUser,
    getStats,
}