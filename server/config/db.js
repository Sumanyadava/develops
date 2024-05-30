import mongoose from 'mongoose'
import  dotenv  from 'dotenv';

dotenv.config()
const database_name = "develops"
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI+database_name)

        console.log('MongoDB connected')

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export default connectDB

// "mongodb+srv://rickkcir18:d4EsltvEHrXL2HkK@cluster0.ksk4xyv.mongodb.net/study_tracker"

// mongodb+srv://user:<password>@mern-todo.ribz1dl.mongodb.net/