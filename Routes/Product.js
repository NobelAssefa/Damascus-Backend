const Product = require("../Models/Product");

const User = require("../Models/User");
const { verifyAndAuhorization, verifyAndIsAdmin } = require("./verifyToken");
const cryptoJs = require("crypto-js")

const router = require("express").Router();

//POST
router.post("/create", verifyAndIsAdmin, async (req, res)=>{
    const newProduct = new Product(req.body)    
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    }catch(err){
        res.status(500).json(err)

    }
})


//GETAll
router.get("/findall", async (req, res)=>{
    const qNew = req.query.new
    const qCategory = req.query.catagory
    try{
        let products;
        if(qNew){
             products =await Product.find().sort({createdAt:-1}).limit(1) ;
        }else if(qCategory){
             products = await Product.find({categories: {$in:[qCategory],}})
        }else{
             products = await Product.find();
        }
        !products && res.status(400).json("no user found")
        res.status(200).json(products)
    }catch(err){
        res.status(500).json(err)

    }
})



//GET BY ID
//GETAll
router.get("/:id", async (req, res)=>{
   
    try{
        const products = await Product.findById(req.params.id);
        res.status(200).json(products)
    }catch(err){
        res.status(500).json(err)

    }
})




//UPDATE
router.put("/:id", verifyAndIsAdmin, async (req, res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true});
        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json(err)

    }
})


//DELETE
router.delete("/:id", verifyAndIsAdmin, async (req, res)=>{
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            res.status(400).json("No Product found!")
        }
       else{
        res.status(200).json("User Deleted Successfully")
       }
       
    }catch(err){
        res.status(500).json(err)

    }
})






module.exports = router