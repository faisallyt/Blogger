const mongoose=require("mongoose");

const dbConnection =process.env.MONGODB_URL || "mongodb+srv://anony6905:faisald181@cluster0.zwdgraw.mongodb.net/Blogger";

mongoose.connect(dbConnection)
.then(()=>{
    console.log('DB connection is Succesfull');
}
)
.catch((err)=>{
    console.log("error Connecting to database");
})

