const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
require('dotenv/config');
require('../../server/index');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`${process.env.REACT_APP_MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.post('/', (req, res) => {
    async function getRegisterUSer() {
        const user = await mongodb.collection('users').find({ email: `${req.body.email}` }).toArray();
        console.log(user[0]);
        console.log(req.body);
        if (user.length === 0) {
            console.log(req.body);
          await  mongodb.collection('users').insertOne(req.body);
            res.send({
                status: 200,
                data: {
                    id: req.body.id,
                    avatar: req.body.avatar,
                    score: req.body.score,
                    pseudo: req.body.pseudo,
                    socketID: req.body.socketID
                }
            });
        }
        else {
            res.send({
                status: 200,
                data: {
                    id: user[0].id,
                    avatar: user[0].avatar,
                    score: user[0].score,
                    pseudo: user[0].pseudo,
                    socketID: user[0].socketID
                }
            });
        }
    }
    getRegisterUSer();
});

module.exports = router;