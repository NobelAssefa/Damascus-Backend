const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoute = require("./Routes/Auth")
const userRoute = require("./Routes/User")
const app = express();
dotenv.config()

app.use(express.json())
app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend is running..")
})

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute )

mongoose.connect(
    process.env.MONGO_URL
).then(()=>{
    console.log("Db connected successfuly..")
}).catch((err)=>{
    console.log(err)

})