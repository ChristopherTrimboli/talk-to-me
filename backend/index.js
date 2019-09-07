const pool = require('./database/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const http_port = 3000;

app.use(cors());
app.use(express.json());

http.createServer(app).listen(http_port, () => { console.log(`Talk to Me listening on port: ${http_port}!`) })

const isEmailDuplicate = email => {
    return new Promise((resolve, reject) => {
        try{
            pool.query('SELECT email from users WHERE email = ?', [email], (error, results) => {
                if (error) {
                    reject(error)
                }
                else if(results.length > 0){ // email exists
                    resolve(true)
                }
                else if(results.length === 0){ // email does not exist
                    resolve(false)
                }
            });
        }
        catch(e){
            reject(e)
        }
    });
}

const sqlQuery = (query, params) => {
    return new Promise((resolve, reject) => {
        try{
            pool.query(query, params, (error, results) => {
                if (error) {
                    console.log(error)
                    reject(error)
                }
                else{
                    resolve(results)
                }
            });
        }
        catch(e){
            reject(e)
        }
    });
}

app.post('/register', async (req, res) => {
    await isEmailDuplicate(req.body.email)
    .then(isDuplicate => {
        if(isDuplicate){
            res.status(500).send({message: 'Email already exists'})
        }
        else{
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, async (err, hashedPass) => {
                await sqlQuery(
                    'INSERT INTO users (email, password) VALUES (?, ?)',
                    [req.body.email, hashedPass]
                ).then(results => {
                    res.status(200).send({message: 'Registered succesfully'})
                }).catch(error => {
                    res.status(500).send(error)
                })
            });
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({error: 'Caught error in: isEmailDuplicate()'})
    })
})

app.post('/login', async (req, res) => {
    await sqlQuery('SELECT * FROM users WHERE email = ?', [req.body.email])
    .then(results => {
        if(results.length > 0){
            bcrypt.compare(req.body.password, results[0].password, function(err, isMatch) {
                if(isMatch){
                    delete results[0].password
                    res.status(200).send({message: 'Login Successful', user: results[0]})
                }
                else{
                    res.status(500).send({message: 'Login failed, incorrect credentials'})
                }
            });
        }
        else{
            res.status(500).send({message: 'Login failed, email does not exist'})
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

