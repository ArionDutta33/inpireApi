const jwt =require("jsonwebtoken")
module.exports.verifyToken=async(req,res,next)=>{
    const token=req.header('authorization')
    if(!token){
        return res.status(401).send("Access Denied")
    }
    try{
        const decoded=jwt.verify('secret')
        console.log(decoded)
        req.user=decoded
        next()
    }catch(err){
        console.log(err)
        res.status(400).send("Invalid Token")
    }
}
