const jwt = require("jsonwebtoken")
const SECRET_KEY ="abcd";

const verifyToken = (req,res,next)=>{
    const token = req.headers["authorization"];
    if(token){
        jwt.verify(token,SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.send("Access Denied");
            }
            else{
                res.userId = decoded.id;
                next();
            }
        });
    }
};

module.exports = verifyToken;