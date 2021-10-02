const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const router = express.Router();

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;
router.use(bodyparser.urlencoded({ extended: false }));


router.post('/', (req, res) => {
    const message = req.body.message;
    const user = req.body.userID;
    console.log('message deleted', message);
    
    mongodb.collection('messages').deleteOne({
        message: message,
        receiver:user
    });
    mongodb.collection('messages').deleteOne({
        message: message,
        sender:user
    });
});

module.exports = router;