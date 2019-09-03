const connection = require('./database/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https')
const http = require('http')
const https_port = 443;
const http_port = 80;

app.use(cors());

app.get('/', function (req, res) {
    connection.query('SELECT * from users', function (error, results, fields) {
        if(error){
            res.status(500).send(error);
            throw error;
        }
        else{
            res.status(200).send(results[0]);
        }
    });
});

app.post('/register', function (req, res) {
    res.send({"Hello": "World"})
})

http.createServer(app).listen(http_port, () => {console.log(`Talk to Me listening on port ${http_port}!`)})
https.createServer(app).listen(https_port, () => {console.log(`Talk to Me listening on port ${https_port}!`)})