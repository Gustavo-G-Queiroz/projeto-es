const alunoService = require('../service/alunoService');
var mongoose = require("mongoose");

exports.create = function (req, res) {
    alunoService.createAluno(req).then(aluno => {
        res.send(aluno);
    });
};

exports.list = function (req, res) {
    alunoService.listAluno().then(alunos =>{
        res.send(alunos);
    });
}

exports.find = function (req, res) {
    alunoService.findAluno(req.params.id).then(aluno =>{
        res.send(aluno);
    });
}

exports.login = function (req, res) {
    alunoService.alunoLogin(req).then(response => {
        res.send(response);
    });
}
