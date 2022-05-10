const turmaService = require("../service/turmaService");
var mongoose = require("mongoose");

exports.create = function (req, res) {
  turmaService.createTurma(req).then(() => {
    res.send("Registro realizado");
  });
};

exports.list = function (req, res) {
  turmaService.listTurma().then((turma) => {
    let user = req.cookies.name;
    res.render("turmas", {
      turmas: turma,
      name: user,
    });
  });
};

exports.list_api = function (req, res) {
  turmaService.listTurma().then((turma) => {
    res.send(turma);
  });
};

exports.entrarGrupo = function (req, res) {
  turmaService.updateGrupo(req).then((turma) => {
    res.send(turma);
  });
};

exports.createGrupo = function (req, res) {
  turmaService.createGrupo(req).then((turma) => {
    res.send(turma);
  });
};

exports.sairGrupo = function (req, res) {
  turmaService.sairGrupo(req).then((turma) => {
    res.send(turma);
  });
};

exports.find = function (req, res) {
  turmaService.findTurma(req.params.id).then((turma) => {
    let user = req.cookies.name;
    res.render("grupos", {
      grupos: turma,
      name: user,
    });
  });
};

exports.listGrupo = function (req, res) {
  turmaService.findGrupo(req).then((grupo) => {
    let user = req.cookies.name;
    res.render("group-select", {
      name: user,
      grupo: grupo.grupo,
      turma: grupo.turma,
      id: grupo.id_turma,
      code: grupo.code,
    });
  });
};

exports.find_api = function (req, res) {
  turmaService.findTurma(req.params.id).then((turma) => {
    res.send(turma);
  });
};

exports.findGrupo = function (req, res) {
  turmaService.findGrupo(req).then((grupo) => {
    res.send(grupo);
  });
};
