import mongoose from "mongoose";
import User from './User.js';
const {Schema,SchemaTypes, model} = mongoose;

const bookwormSchema = new Schema({
});
const Bookworm = User.discriminator("Bookworm",bookwormSchema);
export default Bookworm;