import mongoose from "mongoose";

const {Schema, SchemaTypes,model} = mongoose;

const commentSchema = new Schema({

    bookworm:{
        type:SchemaTypes.ObjectId,
        ref:"Bookworm",
        required:true
    },
    book:{
        type:SchemaTypes.ObjectId,
        ref:"Book",
        required:true
    },
    comment : {
        type:String,
        required:true,
    },


},  { timestamps: true });

const Comment = model('Comment',commentSchema);
export default Comment;