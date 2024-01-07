require('dotenv').config();

import { User } from "../models/index.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const getUser = async () => {
    try {
        const users = await User.find({}).exec();
        return users
    } catch (exception) {
       
    }
}

const login = async ({ email, password }) => {
    let existingUser = await User.findOne({email}).exec()
    if(existingUser){
        let isMatch = await bcrypt.compare(password, existingUser.password)
        if(!!isMatch){
            //create java web token
            let token = jwt.sign({
                data: existingUser
                },
                 process.env.JWT_SECRET,{
                    expiresIn: '10 days'
                }    
            )
            return{
                ...existingUser.toObject(),
                password: 'Not Show',
                token: token
            }

        }else{
            throw new exception("Wrong email or password");
        }
    }else{
        throw new exception("Wrong email or password");
    }
}

const register = async ({
    name,
    email,
    password,
    phoneNumber,
    address
}) => {
    try {
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            console.log("User already exists");
            
        } else {
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
            // Insert to db
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                phoneNumber,
                address
            });
            return {
                ...newUser._doc,
                password: 'Not show'
            }
        }
    } catch (exception) {
        console.log("Error during registration");
        console.error(exception);
        return { message: "Registration failed" };
        // Check model validation here
    }
}

export default {
    getUser,
    login,
    register
};
