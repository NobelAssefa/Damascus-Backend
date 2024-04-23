const User = require("../Models/User");
const { verifyAndAuhorization, verifyAndIsAdmin } = require("./verifyToken");
const cryptoJs = require("crypto-js")

const router = require("express").Router();

//GETAll
router.get("/findall", verifyAndIsAdmin, async (req, res)=>{
    const query = req.query.new
    try{

        const users = query ? await User.find().sort({_id:-1}).limit(1) : await User.find();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)

    }
})


//GET
router.get("/find/:id", verifyAndIsAdmin, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others}= user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)

    }
})




//UPDATE
router.put("/:id", verifyAndAuhorization, async (req, res)=>{
    if(req.body.password){
        req.body.password = cryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)

    }
})


//DELETE
router.delete("/:id", verifyAndAuhorization, async (req, res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        !deletedUser && res.status(400).json("No user found!")
        res.status(200).json("User Deleted Successfully")
    }catch(err){
        res.status(500).json(err)

    }
})





module.exports = router