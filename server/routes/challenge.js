const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.get('/', (req, res) => {
    mongodb.collection('challenges').find({}).toArray((err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            data.map(challenge => {
                delete challenge.city;
                delete challenge.correct;
                delete challenge.rationale;
                challenge['question'] = challenge['country'];
            })
            res.send(data);
        }
    })
});

module.exports = router;