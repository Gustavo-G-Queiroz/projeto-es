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