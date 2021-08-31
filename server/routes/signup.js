const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uuid = require('uuid').v4;
const { body, validationResult } = require('express-validator');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.post('/',
    body('email').isEmail().normalizeEmail().notEmpty(),
    body('pseudo').notEmpty(),
    body('password').notEmpty().isLength({ min: 4 }),
    (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.send('error');
        } else {
            const password = req.body.password.trim();
            const email = req.body.email.trim();
            const pseudo = req.body.pseudo.trim();
            let userID = uuid();
            console.log(email, password, pseudo);
            const encryptPassword = async () => {
                const salt = await bcrypt.genSalt(10);
                const cryptedPassword = await bcrypt.hash(password, salt);
                const user = {
                    id: userID,
                    email: email,
                    pseudo: pseudo,
                    password: cryptedPassword,
                    avatar: ''
                }
                mongodb.collection('users').insertOne(user);
            }
            encryptPassword();

            res.send('200');
        }
    }
)

module.exports = router;