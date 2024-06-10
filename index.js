const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoute = require("./Routes/Auth")
const userRoute = require("./Routes/User")
const productRoute = require("./Routes/Product")
const orderRoute = require("./Routes/Order")
const cartRoute = require("./Routes/Cart")
const app = express();
const cors = require("cors");
dotenv.config()

app.use(express.json())
app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend is running..")
})
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute )
app.use("/api/products", productRoute )
app.use("/api/orders", orderRoute )
app.use("/api/cart", cartRoute )

mongoose.connect( 
    process.env.MONGO_URL
).then(()=>{
    console.log("Db connected successfuly..")
}).catch((err)=>{
    console.log(err)

})