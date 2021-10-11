const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');
require('../../server/index');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`${process.env.REACT_APP_MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.get('/', (req, res) => {
    mongodb.collection('messages').find({}).toArray((err, data) => {
        if (err) {
            console.log(err);

        }
        else {
            res.send(data);
        }
    })
});
module.exports = router;