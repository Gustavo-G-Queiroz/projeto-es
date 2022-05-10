const express = require('express')

const router = express.Router()

const aluno_controller = require('./alunoController');

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/aluno/create', aluno_controller.create);
router.post('/aluno/login', aluno_controller.login);

module.exports = app => app.use(router)