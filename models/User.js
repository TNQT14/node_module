import mongoose, {Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail";
export default mongoose.model('abc',
    new Schema(
        {
            id: { type : ObjectId},
            name: {
                type : String,
                required : true,
            },
            email: {
                type : String,
                validate: {
                    validator: (value) => isEmail,
                    message: 'Email is incorrect format'
                }
            },
            password: {
                type : String,
                required : true,
                
            },
            phoneNumber: {
                type : String,
                required : true,
                
            },
            address: {
                type : String,
                required : false,
            
            },
        }
    )

)