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
            
            const newUser=await User.create({
                username,
                password:hashedPassword,
                name:req.body.name,
                email:req.body.email
            })
            req.session.user={
                id:newUser._id,
                role:'normal',
            }

            res.status(201).json({
                message:"profile created successfully",
                data:newUser,
            })
        }
        catch(error){
            res.status(500).json({
                error:error.message,
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

            req.session.user={
                id:UserExists._id,
                role:'normal',
            }
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

router.post('/create-blog',authenticate,async(req,res)=>{
    try{
        const{title,content}=req.body;
        const userId=req.session.user.id;

        const user=await User.findOne({_id:userId});

        if(!user){
            return res.status(404).json({error:'User not Found'});
        }

        const newBlog=new Blog({
            title,
            content,
            author:userId,
        });
        
        await newBlog.save();
        await user.authoredBlogs.push(newBlog._id);
      
        res.status(201).json({
            message:'Blog created Succesfully',
            data:newBlog,
        });
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Internal Server Error'});
    }
});

module.exports=router;


