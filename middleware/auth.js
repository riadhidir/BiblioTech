import jwt from 'jsonwebtoken';

export const auth =(roles)=>{
    return (req,res,next)=>{
        const accessToken = req.headers['authorization'];
      
    if (!accessToken) return res.status(400).json({ error: "user not authenticated" });
    try {
        const validToken = jwt.verify(accessToken, "thisisasecretmessage");
        if (validToken && roles.includes(validToken.role)) {
            res.authenticated = true;
            return next();
        }
        else if(validToken && !roles.includes(validToken.role)) {
            res.status(401).json('action not Authorized');
        }
    } catch (err) {
        return res.status(400).json({ error: err })
    }
    }
}