import mongoose from "mongoose";

const {Schema,SchemaTypes, model} = mongoose;

const detailSchema = new Schema({
    bookworm:{
        type: SchemaTypes.ObjectId,
        ref: "Bookworm"
    },
    book:{
        type: SchemaTypes.ObjectId,
        ref: "Book"
    },
    
}, { timestamps: true });
const Borow_detail = model("Borow_detail",detailSchema);
export default Borow_detail;

