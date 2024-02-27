const express=require("express");
const app=express();
require('dotenv').config();
const session=require("express-session");
const cookieParser=require("cookie-parser");
const morgan=require("morgan");
const UserRouter=require("./routes/user");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(session({
    secret:'placement',
    resave:true,
    saveUninitialized:true,
}))
app.use(morgan("dev"));

app.use('/user',UserRouter);

app.listen(3000,()=>{
    console.log('App started at port 3000');
});