const express = require('express');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const server = express();

server.set('view engine', 'pug');

server.use(express.static('public'));

server.use(cookieParser());

//For POST-request
server.use(express.urlencoded({extended: true}));

server.get('/', (req, res) => {
const username = req.cookies.username;

res.render('index', {username});
}); 

server.post('/', (req, res) => {
    res.cookie('username', req.body.username);

    res.redirect('/')
});

server.get('/suggestions', (req, res) => {
    // Показать список предложений
    throw new Error('Not implemented');
});

server.post('/suggestions', (req, res) => {
    // Создать предложение
    // Перенаправить на список
    throw new Error('Not implemented');
});

server.listen(3002, 'localhost', () => console.log('Init'))