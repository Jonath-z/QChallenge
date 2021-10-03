const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.post('/',(req, res) => {
    const userID = req.body.userID
    console.log('my user', userID);
   mongodb.collection('users').find({id:`${userID}`}).toArray((err, data) => {
        if (err) {
            console.log(err);

        }
        else {
            res.send(data[0]);
            console.log(data);
        }
    })
});
module.exports = router;