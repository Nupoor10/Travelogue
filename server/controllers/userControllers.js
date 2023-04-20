const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const generateToken = require('../utilities/generateToken')

//userRegistration
const registerUser = async (req,res) => {
    try {
        const { name, email, password} = req.body;

        const existingUser = await User.findOne({email : email})

        if(existingUser) {
            res.status(404).send({
                message : "User Already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
    
        const user = await new User(
            {
                name : name,
                email : email,
                password : hashedPassword,
            }
        )

        await user.save()

        if(user) {
            res.status(201).send({
                message : "User created sucessfully",
                user 
            })
        } 
    }
    catch(error) {
        res.status(500).send({
            message : "User Registration Unsuccessful",
            error: error.message
        })
    }
}

//userLogin
const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email : email})

        const userPassword = await bcrypt.compare(password, user.password)

        if(userPassword === false) {
            res.status(404).send({
                message : "Password Does Not Match",
                err
            })
        }

        const token = generateToken(user._id)
            res.status(200).send({
            message : "User Logged in successfully",
            user : {
                id : user._id,
                name : user.name
            },
            token
        })
    }
    catch(error) {
        res.status(500).send({
            message : "User Login Unsuccessful",
            error: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}