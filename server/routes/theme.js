const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.get('/', async (req, res) => {
    mongodb.collection('theme').find({}).toArray((err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    })
});

module.exports = router;