const pool = require('./database/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
const fetch = require('node-fetch');
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

const updateInterests = (interests, userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            await sqlQuery('DELETE from interests WHERE userId = ?', [userId])
            interests.forEach(async interest => {
                await sqlQuery('INSERT INTO interests (interest, userId, creationDate) VALUES (?, ?, ?)', [interest, userId, new Date()])
            })
            const interestResults = await sqlQuery('SELECT interest FROM interests WHERE userId = ?', [userId])
            let newInterests = [];
            for(let i = 0; i < interestResults.length; i++){
                newInterests.push({key: i, label: interestResults[i].interest})
            }
            resolve(newInterests)
        }
        catch(e){
            console.log(e)
            reject(e)
        }
    });
}

app.post('/googleLocation', async (req, res) => {
    try{
        const session = cryptoRandomString({length: 10});
        const API_KEY = 'AIzaSyC4kxgg5gNToXpDHjIGToetF9sOGabN-Sg'
        const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.body.query}&key=${API_KEY}&sessiontoken=${session}`;
        const isValid = await verifyToken(req.body.token)
        if(isValid){
            const response = await fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            let json = await response.json()
            json = json.predictions.map(element => element.description)
            res.status(200).send(json)
        }
    }
    catch(e){
        console.log(e)
        res.status(500).send({error: e})
    }
})

app.post('/register', async (req, res) => {
    try{
        const isDuplicate = await isEmailDuplicate(req.body.email)
        if(isDuplicate){
            res.status(500).send({message: 'Email already exists'})
        }
        else{
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, async (err, hashedPass) => {
                await sqlQuery(
                    'INSERT INTO users (email, password, registerDate) VALUES (?, ?, ?)',
                    [req.body.email, hashedPass, new Date()]
                )
                res.status(200).send({message: 'Registered succesfully'})
            });
        }
    }
    catch(e){
        console.log(e)
        res.status(500).send({error: e})
    }
})

app.post('/login', async (req, res) => {
    try{
        const passwordResults = await sqlQuery('SELECT password FROM users WHERE email = ?', [req.body.email])
        if(passwordResults.length){
            bcrypt.compare(req.body.password, passwordResults[0].password, async (err, isMatch) => {
                if(isMatch){
                    const userResults = await sqlQuery('SELECT id, email, firstName, lastName, gender, birthday, location FROM users WHERE email = ?', [req.body.email])
                    const interestResults = await sqlQuery('SELECT interest FROM interests WHERE userId = ?', [userResults[0].id])
                    let interests = [];
                    for(let i = 0; i < interestResults.length; i++){
                        interests.push({key: i, label: interestResults[i].interest})
                    }
                    await sqlQuery('UPDATE users SET lastLoginDate = ? WHERE id = ?', [new Date(), userResults[0].id])
                    userResults[0].interests = interests
                    const token = await signToken(userResults[0])
                    res.status(200).send({message: 'Login Successful', token: token})          
                }
                else{
                    res.status(500).send({error: 'Login failed, incorrect credentials'})
                }
            });
        }
        else{
            res.status(500).send({error: 'Login failed, email does not exist'})
        }
    }
    catch(e){
        console.log(e)
        res.status(500).send({error: e})
    }
})

app.post('/updateProfile', async (req, res) => {
    try{
        if(req.body.token){
            const isValid = await verifyToken(req.body.token)
            if(isValid){
                let token = jwt.decode(req.body.token);
                await sqlQuery(
                    'UPDATE users SET firstName = ?, lastName = ?, gender = ?, birthday = ?, location = ?, lastUpdated = ? WHERE users.id = ?',
                    [req.body.firstName, req.body.lastName, req.body.gender, req.body.birthday, req.body.location, new Date(), token.data.id]
                )
                const newInterests = await updateInterests(req.body.interests, token.data.id)
                const userResults = await sqlQuery('SELECT id, email, firstName, lastName, gender, birthday, location FROM users WHERE id = ?', [token.data.id])
                userResults[0].interests = newInterests;
                token = await signToken(userResults[0])
                res.status(200).send({message: 'Profile Updated', token: token})
            }
            else{
                res.status(500).send({error: 'Token not valid.'})
            }
        }
        else{
            res.status(500).send({error: 'No token, Login and try again'})
        }
    } 
    catch(e){
        console.log(e)
        res.status(500).send({error: e})
    }
})

