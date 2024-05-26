import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import EmployeeHome from "../../../client/src/pages/EmployeeHome";



const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    userrole:Number,
    workinghour:Number,
    employeehour:[{
        
    }]
})


const User = mongoose.model('User',userSchema)

export default User