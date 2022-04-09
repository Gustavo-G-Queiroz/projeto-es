const express = require('express');
const router = express.Router();

const aluno_controller = require('./alunoController');

router.get('/teste', aluno_controller.test);

module.exports = router;