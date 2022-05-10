const alunoService = require("../service/alunoService");
var mongoose = require("mongoose");

exports.create = function (req, res) {
  alunoService.createAluno(req).then((aluno) => {
    res.cookie("token", aluno.token);
    res.cookie("ra", aluno.user.ra);
    res.cookie("name", aluno.user.name);
    res.cookie("email", aluno.user.email);
    res.cookie("grupos", aluno.user.grupos);
    res.send(aluno);
  });
};

exports.login = function (req, res) {
  alunoService.alunoLogin(req).then((response) => {
    res.cookie("token", response.token);
    res.cookie("ra", response.user.ra);
    res.cookie("name", response.user.name);
    res.cookie("email", response.user.email);
    res.cookie("grupos", response.user.grupos);
    res.send(response);
  });
};

exports.list = function (req, res) {
  alunoService.listAluno().then((alunos) => {
    res.send(alunos);
  });
};

exports.find = function (req, res) {
  alunoService.findAluno(req.params.id).then((aluno) => {
    res.send(aluno);
  });
};
