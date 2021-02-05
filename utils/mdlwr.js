const redirectVerified = (req,res,next)=>{
    if(req.session.userName){
        res.redirect('/idc')
    }else
        next();
}

const redirectUnverified = (req,res,next)=>{
    if(!req.session.userName){
        res.redirect('/')
    }
    else
        next();
}

module.exports={redirectVerified, redirectUnverified}