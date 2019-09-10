const pool = require('./database/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const http_port = 3000;
const TOKEN_SECRET = process.env.NODE_ENV === "production" ? process.env.TOKEN_SECRET : 'verysecretsecret';

app.use(cors());
app.use(express.json());

http.createServer(app).listen(http_port, () => { console.log(`Talk to Me listening on port: ${http_port}!`) })

const signToken = (data) => {
    return new Promise((resolve, reject) => {
        try{
            jwt.sign({data: data}, TOKEN_SECRET, {expiresIn: '1h'}, (error, token) => {
                if(!error){
                    resolve(token)
                }
                else{
                    reject(error)
                }
            });
        }
        catch(e){
            reject(e)
        }
    });
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        try{
            jwt.verify(token, TOKEN_SECRET, (error, token) => {
                if(!error){
                    resolve(true)
                }
                else{
                    reject(error)
                }
            });
        }
        catch(e){
            reject(e)
        }
    });
}

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
                    'INSERT INTO users (email, password, registerDate) VALUES (?, ?, ?)',
                    [req.body.email, hashedPass, new Date()]
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
    await sqlQuery('SELECT password FROM users WHERE email = ?', [req.body.email])
    .then(results => {
        if(results.length > 0){
            bcrypt.compare(req.body.password, results[0].password, async (err, isMatch) => {
                if(isMatch){
                    await sqlQuery('SELECT id, email, firstName, lastName, gender, birthday, location FROM users WHERE email = ?', [req.body.email])
                    .then(async results => {
                        await sqlQuery('UPDATE users SET lastLoginDate = ? WHERE id = ?', [new Date(), results[0].id])
                        .then(async () => {
                            await signToken(results[0])
                            .then(token => {
                                res.status(200).send({message: 'Login Successful', token: token})
                            })
                            .catch(e => {
                                res.status(500).send({error: 'Token failed to sign'})
                            })
                        })
                        .catch(error => {
                            res.status(500).send(error) // Updating lastLoginTime failed
                        })
                    })
                    .catch(error => {
                        res.status(500).send(error) // Selecting user data failed
                    })
                }
                else{
                    res.status(500).send({error: 'Login failed, incorrect credentials'})
                }
            });
        }
        else{
            res.status(500).send({error: 'Login failed, email does not exist'})
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

app.post('/updateProfile', async (req, res) => {
    if(req.body.token){
        await verifyToken(req.body.token)
        .then(async (isValid) => {
            if(isValid){
                const token = jwt.decode(req.body.token);
                await sqlQuery(
                    'UPDATE users SET firstName = ?, lastName = ?, gender = ?, birthday = ?, location = ?, lastUpdated = ? WHERE users.id = ?',
                    [req.body.firstName, req.body.lastName, req.body.gender, req.body.birthday, req.body.location, new Date(), token.data.id]
                ).then(async () => {
                    await sqlQuery(
                        'SELECT id, email, firstName, lastName, gender, birthday, location FROM users WHERE id = ?', [token.data.id]
                    ).then(async results => {
                        delete results[0].password
                        await signToken(results[0])
                        .then(token => {
                            res.status(200).send({message: 'Profile Updated', token: token})
                        })
                        .catch(e => {
                            res.status(500).send({error: 'Error signing token'})
                        })
                    }).catch(error => {
                        res.status(500).send(error)
                    })
                }).catch(error => {
                    res.status(500).send(error)
                })
            }
        })
        .catch(e => {
            res.status(500).send({error: 'Tokin not valid.'})
        })
    }
    else{
        res.status(500).send({error: 'No token, Login and try again'})
    }
})

