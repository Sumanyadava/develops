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
