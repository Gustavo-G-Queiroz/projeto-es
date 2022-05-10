var mongoose = require("mongoose");
var Turma = mongoose.model("Turma");
const repository = require("../repository/repository");
const alunoService = require("../service/alunoService");

exports.createTurma = function (req) {
  return new Promise(function (resolve, reject) {
    let turma = new Turma({
      _id: req.body.id,
      disciplina: req.body.disciplina,
      grupos: req.body.grupos,
    });
    repository
      .create(turma)
      .then((data) => {
        resolve({
          data: data,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.listTurma = function () {
  return repository.list(Turma);
};

exports.findTurma = function (id) {
  return repository.findById(Turma, id);
};

exports.findGrupo = function (req) {
  return new Promise(function (resolve, reject) {
    repository.findById(Turma, req.params.turma).then((turma) => {
      for (let i in turma.grupos) {
        if (turma.grupos[i]._id == req.params.id) {
          resolve({
            status: "ok",
            data: [turma.grupos[i]],
            turma: turma.disciplina,
            id_turma: turma._id,
            grupo: turma.grupos[i].nome,
            code: turma.grupos[i]._id,
          });
        }
      }
    });
  });
};

exports.updateGrupo = function (req) {
  return new Promise(function (resolve, reject) {
    repository.findById(Turma, req.params.idTurma).then((turma) => {
      for (var i in turma.grupos) {
        if (turma.grupos[i]._id == req.params.idGrupo) {
          if (turma.grupos[i].alunos.includes(req.body.aluno)) {
            resolve({ status: "error", error: "Aluno já está no grupo" });
            break;
          }
          if (turma.grupos[i].alunos.length < turma.grupos[i].integrantes) {
            turma.grupos[i].alunos.push(req.body.aluno);
            alunoService.updateAluno(
              req.params.idTurma,
              req.params.idGrupo,
              req.body.aluno
            );
            break;
          } else {
            resolve({ status: "error", error: "Grupo cheio" });
          }
        }
      }
      repository
        .create(turma)
        .then((data) => {
          resolve({
            status: "ok",
            data: data,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

exports.createGrupo = function (req) {
  return new Promise(function (resolve, reject) {
    repository.findById(Turma, req.params.id).then((turma) => {
      turma.grupos.push(req.body.grupo);
      repository
        .create(turma)
        .then((data) => {
          resolve({
            status: "ok",
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

exports.sairGrupo = function (req) {
  return new Promise(function (resolve, reject) {
    repository.findById(Turma, req.params.idTurma).then((turma) => {
      for (var i in turma.grupos) {
        if (turma.grupos[i].id == req.params.idGrupo) {
          turma.grupos[i].alunos = turma.grupos[i].alunos.filter(
            (a) => a != req.body.aluno
          );
          alunoService.updateAluno(
            req.params.idTurma,
            req.params.idGrupo,
            req.body.aluno
          );
          break;
        }
      }
      repository
        .create(turma)
        .then((data) => {
          resolve({
            status: "ok",
            data: data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};
