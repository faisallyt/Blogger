const express=required("express");
const app=express();
const {User,Comment,Like,Blog}=require("../db/index");
const router=express.Router();
const bcrypt=require("bcrypt");