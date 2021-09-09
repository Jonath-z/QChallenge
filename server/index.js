const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const mongoose = require('mongoose');
const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const challenges = require('./routes/challenge.js');
const theme = require('./routes/theme.js');
// const math = require('./routes/math.js');

mongoose.connect(`mongodb+srv://joz:2511@butik.qrb2j.mongodb.net/QChallenge?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const mongodb = mongoose.connection;

app.use('/statics', express.static(path.join(__dirname, './src/index.css')));
app.use('/static', express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use('/login', login);
app.use('/signup', signup);
app.use('/challenges', challenges);
app.use('/theme', theme);
// app.use('/math', math);

io.on('connection', (socket) => {
    console.log(socket.id);
    // socket.on('question', (data) => {
    //     if (data.theme === 'Contry and Capital') {
    //         mongodb.collection(`${data.theme}`).find({ country: `${data.question}` }).toArray((err, response) => {
    //             err && console.log(err);
    //             console.log(response,data.theme);
    //             socket.emit('response', data);
    //         })
    //     }
    //     else {
    //         mongodb.collection(`${data.theme}`).find({ question: `${data.question}` }).toArray((err, data) => {
    //             err && console.log(err);
    //             console.log(data);
    //             socket.emit('response', data);
    //         });
    //     }  
    // });
});

server.listen(5050, () => { console.log('server is running') });