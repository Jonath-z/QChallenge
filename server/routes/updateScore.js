const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const router = express.Router();

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;
router.use(bodyparser.urlencoded({ extended: false }));

router.post('/', (req, res) => {
    const theme = req.body.theme;
    const id = req.body.id;
    const Newscore = req.body.score;
    const level = req.body.level;
    console.log(`score: ${Newscore},level:${level},id: ${id},theme :${theme}`);
    
    mongodb.collection('users').updateOne(
        { id: id, "score.theme": `${theme}` },
        {
            $set: {
                "score.$.score": Newscore,
                "score.$.level":level
            }
        },
    )
    res.send('updated');

});

module.exports = router;