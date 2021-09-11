// const express = require('express');
// const bodyparser = require('body-parser');
// const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');
// const { body, validationResult } = require('express-validator');
// const firebase = require('./firebase.js');

// const storage = firebase.storage();


// const router = express.Router();
// // router.use(bodyparser.urlencoded({ extended: false }));



// router.post('/',(req, res) => {
//     console.log('my file', req.file);
//     if (req.file === 'undefined') {
//         res.send('please select one file');
//     } else {
//         console.log('my file', req.file);
//         storage.upload(req.file);
//         // res.send('uploaded'); 
//     }
// });

// module.exports = router;