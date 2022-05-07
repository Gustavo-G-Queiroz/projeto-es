const express = require('express');
const router = express.Router();

const aluno_controller = require('./alunoController');
const turma_controller = require('./turmaController');

router.post('/aluno/create', aluno_controller.create);
router.get('/aluno/list', aluno_controller.list);
router.get('/aluno/:id', aluno_controller.find);
router.post('/turma/create', turma_controller.create);
router.get('/turma/list', turma_controller.list);
router.put('/turma/entrar/:idTurma/:idGrupo', turma_controller.entrarGrupo)
router.put('/turma/grupo/:id', turma_controller.createGrupo)
router.delete('/turma/sair/:idTurma/:idGrupo', turma_controller.sairGrupo)
router.post('/aluno/login', aluno_controller.login)

module.exports = router;