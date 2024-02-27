const mongoose=require("mongoose");

const dbConnection =process.env.MONGODB_URL || "mongodb+srv://anony6905:faisald181@cluster0.zwdgraw.mongodb.net/Blogger";

mongoose.connect(dbConnection)
.then(()=>{
    console.log('DB connection is Succesful');
}
)
.catch((err)=>{
    console.log("error Connecting to database");
})

const userSchema=new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    authoredblogs:[{type:mongoose.Schema.Types.Objectid,ref:'Blog'}],
});

const commentSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.Objectid,ref:'User'},
    text:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
})

const likeSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.Objectid,ref:'User'},
    createdAt:{type:Date,default:Date.now},
})

const blogSchema=new mongoose.Schema({
    title:String,
    content:String,
    author:{type:mongoose.Schema.Types.Objectid,ref:'User'},
    createdAt:{type:Date,default:Date.now},
    updatedAt:Date,
    comments:[{type:mongoose.Schema.Types.Objectid,ref:'Comment'}],
    likes:[{type:mongoose.Schema.Types.Objectid,ref:'Like'}]
});


const User=mongoose.model('User',userSchema);
const Comment=mongoose.model('Comment',commentSchema);
const Like=mongoose.model('Like',likeSchema);
const Blog=mongoose.model('Blog',blogSchema);


module.exports={
    User,
    Comment,
    Like,
    Blog
}