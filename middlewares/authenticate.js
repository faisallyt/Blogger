
function authenticate(req,res,next){
    if(req.session.id ){
        next();
    }
    else{
        res.status(401).json({
            error:'Unautorized access',
        })
    }
};

module.exports=authenticate;