const pool = require('./database/config.js');
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
    pool.query('SELECT * from users', function (error, results, fields) {
        if (error) {
            res.status(500).json(error);
            throw error;
        }
        else {
            res.status(200).json(results[0]);
        }
    });
});

app.post('/register', function (req, res, next) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hashedPass) {
        pool.query('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
        [req.body.email, hashedPass, req.body.firstName, req.body.lastName],
        function (error, results, fields) {
            if (error) {
                res.status(500).send(error);
                console.log(error)
                next();
            }
            else {
                res.status(200).send();
                next();
            }
        });
    });
})

app.post('/login', function (req, res, next) {
    pool.query('SELECT * FROM users WHERE email = ?', [req.body.email],
    function (error, results, fields) {
        if (error) {
            res.status(500).send(error);
            console.log(error)
            next();
        }
        else if(results.length > 0){ // if email exists check password hash
            console.log(results[0])
            bcrypt.compare(req.body.password, results[0].password, function(err, isMatch) {
                if(isMatch === true){
                    res.status(200).send();
                    next();
                }
                else{
                    res.status(500).send();
                    next();
                }
            });

        }
        else{ // email does not exist
            res.status(500).send();
            next();
        }
    });
})

http.createServer(app).listen(http_port, () => { console.log(`Talk to Me listening on port: ${http_port}!`) })
https.createServer(app).listen(https_port, () => { console.log(`Talk to Me listening on port: ${https_port}!`) })