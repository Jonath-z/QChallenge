const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const router = express.Router();
router.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

router.post('/',
    body('email').isEmail().normalizeEmail().notEmpty(),
    body('password').notEmpty().isLength({ min: 4 }),
    (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.send({status: '404 email'});
            console.log('login err')
        }
        else{
            const password = req.body.password.trim();
            const email = req.body.email.trim();
            
            mongodb.collection('users').find({ email: `${email}` }).toArray((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const encryptPassword = async () => {
                        const validPassword = await bcrypt.compare(password, data[0].password);
                        if (validPassword) {
                            res.send({ status: '200', id: data[0].id });
                        }else{
                        // else if (!validPassword) {
                            res.send({ status: '404' });
                        }
                        // console.log(data);
                    }
                    encryptPassword();
                }
            });
            console.log(password, email);
        }
    }
)

module.exports = router;