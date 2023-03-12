import mongoose, { SchemaType } from "mongoose";
import User from "./User.js";
const {Schema , model} = mongoose;

const employeeSchema = new Schema({
});
const Employee = User.discriminator("Employee",employeeSchema);
export default Employee;