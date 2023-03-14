import mongoose from "mongoose";

const {Schema, SchemaTypes,model} = mongoose;

const replySchema = new Schema({

    comment:{
        type:SchemaTypes.ObjectId,
        ref:"Comment",
        required:true
    },
    reply : {
        type:String,
        required:true,
        
    },


},  { timestamps: true });

const Reply = model('Reply',replySchema);
export default Reply;