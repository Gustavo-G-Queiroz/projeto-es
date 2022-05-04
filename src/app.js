const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const conector = require('./repository/conector')
require('./model/aluno')
require('./model/turma')
const route = require('./controller/route');

const database = conector.conectar();

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Base de dados conectada');
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(route)
app.use(express.static(__dirname + '/public'));

let port = 8080;

app.listen(port, () => {
    console.log("Servidor ativo!");
});

app.get('/', (request, response) => {
    response.render('index');
})

app.get('/login', (request, response) => {
    response.render('login');
})

app.get('/turmas', (request, response) => {
    response.render('turmas');
})