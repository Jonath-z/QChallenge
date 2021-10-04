const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.post('/', (req, res) => {
    const userID = req.body.userID;
    const newEmail = req.body.newEmail;
    const newPseudo = req.body.newPseudo
    console.log('for update', userID, newEmail, newPseudo);
    if (newEmail !== '') {
        mongodb.collection('users').updateOne(
            {
                id: userID
            },
            {
            $set: {
                    email: newEmail,
            }
        });
    }
    if (newPseudo !== '') {
        mongodb.collection('users').updateOne(
            {
                id: userID
            },
            {
            $set: {
                    pseudo: newPseudo
            }
        });
    }
});
module.exports = router;