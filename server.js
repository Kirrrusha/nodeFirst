const express = require('express');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const suggestions = [{
    id: 1,
    title: 'Знакомство с серверной разработкой',
    voters: new Set()
}];

const server = express();

server.set('view engine', 'pug');

server.use(express.static('public'));

server.use(cookieParser());

//For POST-request
server.use(express.urlencoded({
    extended: true
}));

server.get('/', (req, res) => {
    const username = req.cookies.username;

    res.render('index', {
        username
    });
});

server.post('/', (req, res) => {
    res.cookie('username', req.body.username);

    res.redirect('/')
});

server.get('/suggestions', (req, res) => {
    res.render('suggestions', {
        suggestions
    });
});

server.get('/suggestions/:id', (req, res) => {
    const username = req.cookies.username;
    const suggestion = suggestions.find(suggestion => suggestion.id === +req.params.id);
    res.render('suggestion', {
        username,
        suggestion
    })
});

server.post('/suggestions', (req, res) => {
    const title = req.body.title;

    suggestions.push({
        id: ++suggestions[suggestions.length - 1].id,
        title,
        voters: new Set()
    });

    res.redirect('/suggestions');
});

server.post('/suggestions/:id', (req, res) => {
    const suggestion = suggestions.find(suggestion => suggestion.id === +req.params.id);
    const username = req.cookies.username;

    if (suggestion.voters.has(username)) {
        suggestion.voters.delete(username);
    } else {
        suggestion.voters.add(username);
    }

    console.log(suggestion);

    res.redirect(`/suggestions/${suggestion.id}`);
});

server.listen(3002, 'localhost', () => console.log('Init'))