const express = require('express');

const server = express();

//For POST-request
server.use(express.urlencoded({extended: true}));

server.get('/', (req, res) => {

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Предложение</title>
        </head>
        <body>
            <h1>Вход</h1>
            <form method="POST">
                <input type="text" name="username" />
                <button type="submit">Войти</button>
            </form>
        </body>
        </html>
    `);

});

server.post('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Предложение</title>
    </head>
    <body>
        <p>Привет ${req.body.username}</p>
    </body>
    </html>`);
});

server.listen(3002, 'localhost', () => console.log('Init'))