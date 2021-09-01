const express = require('express');
const path = require('path');
const app = express();
const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const challenges = require('./routes/challenge.js');
const theme = require('./routes/theme.js');

app.use('/statics', express.static(path.join(__dirname, './src/index.css')));
app.use('/static', express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use('/login', login);
app.use('/signup', signup);
app.use('/challenges', challenges);
app.use('/theme', theme);




app.listen(5050, () => { console.log('server is running') });