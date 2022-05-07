const turmaService = require('../service/turmaService');
var mongoose = require("mongoose");

exports.create = function (req, res) {
    turmaService.createTurma(req).then(() => {
        res.send("Registro realizado");
    });
};

exports.list = function (req, res) {
    turmaService.listTurma().then(turmas =>{
        res.send(turmas);
    });
}

exports.entrarGrupo = function (req, res) {
    turmaService.updateGrupo(req).then(turma =>{
        res.send(turma);
    });
}

exports.createGrupo = function (req, res) {
    turmaService.createGrupo(req).then(turma =>{
        res.send(turma);
    });
}

exports.sairGrupo = function (req, res) {
    turmaService.sairGrupo(req).then(turma =>{
        res.send(turma);
    });
}

exports.find = function (req, res) {
    turmaService.findTurma(req.params.id).then(turma =>{
        res.send(turma);
    });
}