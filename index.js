const express=require("express");
const app=express();
require('dotenv').config();

app.use(express.json());


app.listen(3000,()=>{
    console.log('App started at port 3000');
});