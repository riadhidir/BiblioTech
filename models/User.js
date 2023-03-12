import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const options= {
    discriminatorKey :"role",
    timestamps:true 
}

const userSchema = new Schema({
    password:{
        type:String,
        required:[true, "password required"]
    }, 
     email:{
        type:String,
        required:[true, "email required"],
        unique : [true, "email already in use"]
    },
    nom: {
        type:String,
        required:[true, "lastname  required"]
    },
    prenom:{
        type:String,
        required:[true, "firstname  required"]
    },
    phone:{
        type:String,
        required:[true, "phone number required"]
    }
}, options);

const User = model('User',userSchema);
export default User;
