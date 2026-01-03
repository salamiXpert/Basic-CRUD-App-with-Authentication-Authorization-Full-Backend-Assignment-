const jwt = require(`jsonwebtoken`)

const isAuth = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader||!authHeader.startsWith("Bearer")){
        return res.status(409).json({message:`Authorization header missing or malformed`});
    }
    const  token = await authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(500).json({message:`Invalid or expired token`});
    }

}

module.exports = isAuth;