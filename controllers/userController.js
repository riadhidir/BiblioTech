import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id, role: user.role }, 'thisisasecretmessage', { expiresIn: '1800s' });
     
}
const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id, role: user.role }, 'thisisasecretmessage2', { expiresIn: '1y' });
     
}

export const Login = async (req, res)=>{
    const {email , password} = req.body;
        const user = await User.findOne({email}).exec();
        if(!user) {res.status(400).json({error:"user doesnt exists"});}
        else{ 
            const dbPassowrd = user.password;
            bcrypt.compare(password,dbPassowrd).then((match)=>{
                 if(!match){
             res.status(400).json({error:"wrong username and password combination "});
            }else{
                const accessToken = generateAccessToken(user);
                res.cookie("access-token", accessToken,{
                    maxAge: 604800000,
                    httpOnly:true
                })
                res.json({message:"logged in"});
            }
            })
        }

       
}