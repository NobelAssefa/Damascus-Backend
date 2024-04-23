const Order = require("../Models/Order")
const { verifyAndAuhorization, verifyAndIsAdmin, verifyToken } = require("./verifyToken");
const cryptoJs = require("crypto-js")

const router = require("express").Router();

//POST
router.post("/create", verifyToken, async (req, res)=>{
    const newOrder = new Order(req.body)    
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)

    }
})


//GETAll
router.get("/findall", verifyAndIsAdmin, async (req, res)=>{
    try{
        const order = await Order.find();
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
})

// GET INCOME STATS
router.get("/income", verifyAndIsAdmin, async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth)-1)
    try{
        const income = await Order.aggregate([
        {
            $match: {createdAt: {$gte:previousMonth}}
        },
        {
            $project:
             {month: {$month: "$createdAt"},
            sales: "$amount",
        },
        },
        {
            $group: {
                _id:"$month",
                total:{$sum: "$sales"},
            }
        }

    ])
    res.status(200).json(income)
        
    }catch(err){
        res.status(500).json(err)
    }

} )


//GET BY ID

router.get("/:id", verifyAndIsAdmin, async (req, res)=>{
   
    try{
        const order = await Order.findById(req.params.id);
        res.status(200).json(order)
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