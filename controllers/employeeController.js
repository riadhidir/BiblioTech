import Employee from '../models/employee.js';
import bcrypt from 'bcrypt'

export const register= async(req,res)=>{
    const {email,nom, prenom, phone, password} = req.body;
    const _email = await Employee.findOne({email}).exec();
    if(!_email){
        bcrypt.hash(password, 10).then( async (password)=>{
            await Employee.create({
                email,nom, prenom,phone, password
            }).then(()=>{
                res.json('Registered Successfully!');
            }).catch((err) => {
                res.status(400).json({ error: err })
            });
        });
    }else{
        res.status(200).json({message:'email already in use'});
    }
}