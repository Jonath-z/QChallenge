const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const upload = require('../middleware/upload.js');

const router = express.Router();
// router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.post('/', upload.single('file'), async (req, res) => {
    if (req.file === 'undefined') {
        res.send('please select one file');
    }
    res.send('uploaded');
});

module.exports = router;