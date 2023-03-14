import mongoose from "mongoose";
import User from './User.js';
const {Schema,SchemaTypes, model} = mongoose;

const bookwormSchema = new Schema({
    access :{
        type: Date,
        default: function(){
            return new Date().getTime();
        }
    }
});
const Bookworm = User.discriminator("Bookworm",bookwormSchema);
export default Bookworm;