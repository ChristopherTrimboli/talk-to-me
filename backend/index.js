const connection = require('./database/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors())

app.get('/', function (req, res) {
    connection.query('SELECT * from users', function (error, results, fields) {
        if(error){
            res.status(500).send(error);
            throw error;
        }
        else{
            res.status(200).send(results[0])
        }
    });
})

app.listen(port, () => console.log(`Talk to Me listening on port ${port}!`))