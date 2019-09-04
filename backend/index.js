const pool = require('./database/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const http = require('http');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const https_port = 443;
const http_port = 80;

app.use(cors());
app.use(express.json());

http.createServer(app).listen(http_port, () => { console.log(`Talk to Me listening on port: ${http_port}!`) })
https.createServer(app).listen(https_port, () => { console.log(`Talk to Me listening on port: ${https_port}!`) })

const isEmailDuplicate = async (email) => {
    return new Promise((resolve, reject) => {
        try{
            pool.query('SELECT email from users WHERE email = ?', [email],
            function (error, results, fields) {
                if (error) {
                    resolve(true);
                }
                else if(results.length > 0){ // email exists
                    resolve(true);
                }
                else if(results.length === 0){ // email does not exist
                    resolve(false);
                }
            });
        }
        catch(e){
            reject(e);
        }
    });
}

app.post('/register', async function (req, res) {
    await isEmailDuplicate(req.body.email)
    .then((isDuplicate) => {
        if(isDuplicate){
            res.status(500).send({message: 'Email already exists'});
        }
        else{
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, function(err, hashedPass) {
                pool.query('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
                [req.body.email, hashedPass, req.body.firstName, req.body.lastName],
                function (error, results, fields) {
                    if (error) {
                        res.status(500).send(error);
                    }
                    else {
                        res.status(200).send({message: 'Registered succesfully'});
                    }
                });
            });
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).send({error: 'Caught error in: /register'});
    })
})

app.post('/login', function (req, res) {
    pool.query('SELECT * FROM users WHERE email = ?', [req.body.email],
    function (error, results, fields) {
        if (error) {
            res.status(500).send(error);
            console.log(error)
        }
        else if(results.length > 0){ // if email exists check password hash
            console.log(results[0])
            bcrypt.compare(req.body.password, results[0].password, function(err, isMatch) {
                if(isMatch === true){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(500);
                }
            });
        }
        else{ // email does not exist
            res.sendStatus(500);
        }
    });
})

