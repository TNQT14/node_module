import mongoose from "mongoose";
async function connect() {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('connect mongoose successfull')
        return connection
    } catch (error) {
        let errorMessage = error.code;
        console.log("========", error);
    }
}

export default connect
