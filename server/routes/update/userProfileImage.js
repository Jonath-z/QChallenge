const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.post('/', (req, res) => {
    const userID = req.body.userID;
    const newProfile = req.body.url;
    console.log('my user', userID, 'URL', newProfile);
    mongodb.collection('users').updateOne(
        {
            id: userID
        },
        {
        $set: {
            avatar: newProfile
        }
    });
});
module.exports = router;