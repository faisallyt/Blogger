const express=require("express");
const app=express();
const {User,Comment,Like,Blog}=require("../db/index");
const router=express.Router();
const bcrypt=require("bcrypt");
const authenticate=require("../middlewares/authenticate");


router.post('/signup',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const UserExists=await User.findOne({username});

    if(!UserExists){
        try{
            const hashedPassword=await bcrypt.hash(password,10);
            
            await User.create({
                username,
                password:hashedPassword,
                name:req.body.name,
                email:req.body.email
            })
            req.session.user={
                id:UserExists._id,
                role:'normal',
            }

            res.status(201).json({
                message:"profile created successfully"
            })
        }
        catch(error){
            res.status(500).json({
                error:errer.message,
            })
        }
    }else{
        res.status(409).json({
            error:'User already Exists',
        })
    }
});

router.post('/login',async(req,res)=>{
    if(req.session.user){
        return res.status(403).json({
            error:'User is already loggedIn',
        })
    }
    const {username,password}=req.body;

    const UserExists=await User.findOne({username});

    if(UserExists){
        const PasswordMatch=await bcrypt.compare(password,UserExists.password);
        if(PasswordMatch){
            res.status(200).json({
                message:'LoggedIn Succesfully',
                user:req.session.user,
                data:UserExists,
            })
        }
        else{
            res.status(401).json({
                error:'Password Did not match',
            })
        }
    }
    else{
        res.status(401).json({
            error:'Invalid username ',
        })
    }
});

router.get('/logout',authenticate,async(req,res)=>{
    req.session.destroy();
    res.status(500).json({
        message:'Logout Succesful',
    })
})

module.exports=router;


