import {
    body,
    validationResult,

} from 'express-validator';
import {
    userRepository
} from '../repositories/index.js'
import { EventEmitter } from 'node:events'
import user from '../repositories/user.js';
const myEvent = new EventEmitter()
// listen
myEvent.on('event.register.user', (params) => {
    console.log(`They talk about: ${JSON.stringify(params)}`);
});

const getUser = async (req, res) =>{
    try {
        const user = await userRepository.getUser()
        res.status(200).json(user.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
        })));
    }catch(exception){
        res.status(400).json({
            message: exception.toString(),
        })
    }
}

const postLoginUser = async (req, res) => {

    if (req.body) {
        const { email, password } = req.body;
        try{
            let existingUser =await userRepository.login({ email, password })
            res.status(200).json({
                messsage: 'login successfully',
                data: existingUser
             })
        }catch(exception){
            res.status(500).json({
                message: exception.toString(),
            })
        }
        // call repositories        
    } else {
        res.status(400).json({ error: 'Email is missing in the request' });
    }

}

const postRegisterUser = async (req, res) => {
    const { name, email, password, phoneNumber, address } = req.body;

    // Event EventEmitter
    myEvent.emit('event.register.user', { email, password })

    try {
        const user = await userRepository.register({ name, email, password, phoneNumber, address })
        if (user){
            res.status(201).json({
                message: ' register successfully',
                data: user
            })
        }else{
            
            res.status(201).json({
                message: ' User alreadly exists',
                data: user
            })
        }
    } catch (exception) {
        console.log(exception.error);
        data: user

    }

}

module.exports = {
    getUser,
    postLoginUser,
    postRegisterUser
}