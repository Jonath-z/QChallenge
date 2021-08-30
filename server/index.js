const express = require('express');
const path = require('path');
const app = express();
const login = require('./routes/login.js');

app.use('/static', express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use('/login', login);





app.listen(5050, () => { console.log('server is running') });