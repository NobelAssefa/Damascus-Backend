const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        products: [{
            productId:{
                type:String,
            },
            quantity: {
                type:Number,
                default:1
            }
        }],
        amount:{type: Number, required: true},
        status: { type: String,default: "Pending"},
        address: {type:Object, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order",OrderSchema)

// Model name and Schema name is wrriten inside the bracket