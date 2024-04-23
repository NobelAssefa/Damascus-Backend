const Cart = require("../Models/Cart");

const { verifyAndAuhorization, verifyAndIsAdmin } = require("./verifyToken");
const cryptoJs = require("crypto-js")

const router = require("express").Router();

//POST
router.post("/create", verifyAndAuhorization, async (req, res)=>{
    const newCart = new Cart(req.body)    
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)

    }
})


//GETAll
router.get("/findall", verifyAndIsAdmin, async (req, res)=>{
    try{
        const Cart = await Cart.find();
        res.status(200).json(Cart)
    }catch(err){
        res.status(500).json(err)
    }
})



//GET USER CART
router.get("/:userId", verifyAndIsAdmin, async (req, res)=>{
   
    try{
        const Cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(Cart)
    }catch(err){
        res.status(500).json(err)

    }
})




//UPDATE
router.put("/:id", verifyAndIsAdmin, async (req, res)=>{
    try{
        const updatedOrder= await Order.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedOrder)
    }catch(err){
        res.status(500).json(err)

    }
})

module.exports = router