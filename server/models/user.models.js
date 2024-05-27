import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import EmployeeHome from "../../../client/src/pages/EmployeeHome";



const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    userRole: {
        type: String,
        enum: ["admin", "hr", "employee"],
        default: "admin",
        required:true
      },
      workingHours: {
        type: Number,
        min: 0,
        max: 24
      },
      inOutTime: [
        {
          inTime: {
            type: Date,
            
          },
          outTime: {
            type: Date,
            
          }
        }
      ],
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
})


const User = mongoose.model('User',userSchema)

export default User