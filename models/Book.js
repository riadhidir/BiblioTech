import mongoose from "mongoose";

const {Schema, SchemaTypes,model} = mongoose;

const bookSchema = new Schema({

    title : {
        type:String,
        required:true,
        unique:true
    },
    author :{
        type:String,
        required:true
    },
    copies_number: {
        type:Number,
        required:true,
    },
    available_copies:{
        type:Number,
        default:function (){
            return this.copies_number}
        
    },
    rating:{
        type:Number,
        default: 10,
        minNum:0,
        maxNum: 10
    },

    borrowing_number:{
        type:Number,
        default:0
    },
    categories:[{
        type:SchemaTypes.ObjectId,
        ref:"Category"
    }]

},  { timestamps: true });

const Book = model('Book',bookSchema);
export default Book;