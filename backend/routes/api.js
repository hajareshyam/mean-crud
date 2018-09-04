const express = require('express');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const router = express.Router();

const User = require('../models/user');

var ObjectId = require('mongoose').Types.ObjectId;

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }
  

router.get('/', (req, res) => {
    res.send('FROM API Route');
})


router.post('/register', (req,res) => {
    let userData = req.body;
    // console.log(userData.email);
    User.findOne({email: userData.email}, (error, user) => {
       res.status(200).send({error: 1, message: 'Email already exists'})
    })
    return;
    bcrypt.genSalt(10, function(err, salt) {
        console.log("LEVEL 1");
        bcrypt.hash(userData.password, salt, function(err, hash) {
            // Store hash in your password DB.
            userData.password = hash;
            console.log("LEVEL 2");
            let user = new User(userData);
            user.save((error,registerUser) => {
                if(error){
                    console.log(error)
                }else{
                    let payload = {subject: registerUser._id}
                    let token = jwt.sign(payload, 'secretKey')
                    // res.status(200).send({token})
                    res.status(200).send({error: 0, message: 'User register successfully', token: token})
                }
            })
        });
    });
    
})

router.post('/login',(req,res) => {
    let userData = req.body;
    console.log(userData);
    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send('Invalid email')
            }
            console.log("Level 1");
            bcrypt.compare(userData.password, user.password, function(err, response) {
                // res == true
                if(!response){
                    console.log(userData);
                    res.status(401).send('Invalid Password')
                    console.log("Level 2");
                }else{
                    console.log("Level 3");
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload,'secretKey');
                    res.status(200).send({token})
                }
            });
        }
    })
})

router.get('/users',verifyToken, (req, res) => {
    User.find((err, docs) => {
        if (!err) { console.log(docs); res.send(docs); }
        else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    }); 
});

router.delete('/user/:id',(req,res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/user/:id', (req, res) => {
    console.log("SHAYAYAAAAA");
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    var emp = {
        email: req.body.email,
    };
    User.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;