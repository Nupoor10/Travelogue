const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

//userRegistration
const registerUser = (req,res) => {
    bcrypt.hash(req.body.password, 10).then(
        (hashedPassword) => {
            const user =  new User(
                {
                    name : req.body.name,
                    email : req.body.email,
                    password : hashedPassword,
                }
            )
        
            user.save().then(
                result => {
                    res.status(201).send({
                        message : "User created sucessfully",
                        result
                    })
                }
            ).catch(
                err => {
                    res.status(500).send({
                        message : "User was not created",
                        err
                    })
                }
            )
        }).catch(
            (err) => { 
                res.status(500).send({
                    message : "Password field is required",
                    err
            })
        })
}

//userLogin
const loginUser = (req,res) => {
    User.findOne({email : req.body.email}).then(
        user => {
            bcrypt.compare(req.body.password, user.password).then(
                result => {
                    if(!result) {
                        res.status(404).send({
                            message : "Password is Incorrect",
                            err
                        })
                    }
                    else if(result) {
                        const token = jwt.sign(
                            { 
                                userId: user._id,
                                userEmail: user.email,
                            },
                            "RANDOM-TOKEN",
                            {expiresIn : "30 days"}
                        )

                        res.status(200).send({
                            message : "User Logged in successfully",
                            user : {
                                id : user._id,
                                name : user.name
                            },
                            token
                        })
                    }
                }
            )
        }
    ).catch(
        err => {
            res.status(404).send({
                message : "User was not found",
                err
            })
            console.log(err)
        }
    )
}

module.exports = {
    registerUser,
    loginUser
}