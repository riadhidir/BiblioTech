import Bookworm from '../models/Bookworm.js';
import Borow_detail from '../models/Borrow_detail.js';
import Book from '../models/Book.js';
import bcrypt from 'bcrypt';
import {sendEmail} from "./emailController.js";


export const register= async(req,res)=>{
    const {email,nom, prenom, phone, password} = req.body;

    const _email = await Bookworm.findOne({email}).exec();
    if(!_email){
        bcrypt.hash(password, 10).then( async (password)=>{
            await Bookworm.create({
                email,nom, prenom,phone, password
            }).then(async ()=>{
                // const data=[];
                const books  = await Book.find({},'-_id title').catch((err)=>{
                    console.log(err, 'cant send email');
                });
                // books.forEach((book)=>{
                //     data.push(book.title);
                // })
                await sendEmail(email, JSON.stringify(books)).catch(console.error);
                res.json('Registered Successfully!');

            }).catch((err) => {
                res.status(400).json({ error: err.errors })
            });
        });
    }else{
        res.status(200).json({message:'email already in use'});
    }
}

