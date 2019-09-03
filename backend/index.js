const connection = require('./database/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const http = require('http');
const bcrypt = require('bcrypt');
const https_port = 443;
const http_port = 80;

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) {
            res.status(500).json(error);
            throw error;
        }
        else {
            res.status(200).json(results[0]);
        }
    });
});

app.post('/register', async (req, res, next) => {
    try{
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
        connection.query('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
        [req.body.email, hashedPass, req.body.firstName, req.body.lastName],
        function (error, results, fields) {
            if (error) {
                res.status(500).send(error);
                throw error;
            }
            else {
                res.status(200);
                next();
            }
        });
    }
    catch(error){
        console.log(error)
    }
})

http.createServer(app).listen(http_port, () => { console.log(`Talk to Me listening on port: ${http_port}!`) })
https.createServer(app).listen(https_port, () => { console.log(`Talk to Me listening on port: ${https_port}!`) })