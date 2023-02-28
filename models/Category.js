import mongoose from "mongoose";

const {Schema, model} = mongoose;

const categorySchema = new Schema({

    title : {
        type:String,
        required:true,
        unique:[true, "category already exists"]
    },
    

},  { timestamps: true });

categorySchema.statics.getCategoryByTitle =  async function(categories){
    const _categories=[];
    try{
    await Promise.all(
        categories.map(  async (category)=>{
           const c = await this.findOne({title:category});
             _categories.push(c._id);      
     })
    );}catch(err){
        console.log(err)
    }
 return _categories;
 }
const Category = model('Category',categorySchema);

export default Category;