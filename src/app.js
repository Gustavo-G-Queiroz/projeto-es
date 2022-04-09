const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const route = require('./controller/route');
const conector = require('./repository/conector')

const database = conector.conectar();

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Base de dados conectada');
})

const app = express();

app.use(route)

let port = 8080;

app.listen(port, () => {
    console.log("Hello " + port);
});