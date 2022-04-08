const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const path = require('path')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require("cors");
const fileupload = require('express-fileupload')
app.use(fileupload({
  useTempFiles : true,
}));

app.use(express.json())


app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,'POST, GET, OPTIONS")
    next();
});  

app.use(cors({

    origin:"https://mern-ecommerce-forall.herokuapp.com",
    credentials: true,
}))
app.use(express.json());
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))
app.use('/api', require('./routes/categoryRouter'))


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}  

//app.use(cors());


app.listen(process.env.PORT || 2662, () => {
  console.log("Backend server is running!",process.env.PORT);
});


























// Routes
app.use('/user', require('./routes/userRouter'))