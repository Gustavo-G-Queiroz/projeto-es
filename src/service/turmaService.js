var mongoose = require("mongoose");
var Turma = mongoose.model("Turma")
const repository = require("../repository/repository");

exports.createTurma = function (req) {
    return new Promise(function (resolve, reject) {
        let turma = new Turma(
            {
                _id: req.body.id,
                disciplina: req.body.disciplina,
                grupos: req.body.grupos
            }
        );
        repository
            .create(turma)
            .then(data => {
                resolve({
                    data: data
                });
            })
            .catch(err => {
                reject(err);
            });
    });
}

exports.listTurma = function () {
    return repository.list(Turma);
}

exports.findTurma = function (id) {
    return repository.findById(Turma, id);
}

exports.updateGrupo = function (req) {
    return new Promise(function (resolve, reject) {
        repository.findById(Turma, req.params.idTurma).then(turma => {
            for(var i in turma.grupos){
                if(turma.grupos[i].id == req.params.idGrupo){
                    turma.grupos[i].alunos.push(req.body.aluno);
                    break;
                }
            }
            repository
            .create(turma)
            .then(data => {
                resolve({
                    data: data
                });
            })
            .catch(err => {
                reject(err);
            });
        });
    });
}

exports.createGrupo = function (req) {
    return new Promise(function (resolve, reject) {
        repository.findById(Turma, req.params.id).then(turma => {
            turma.grupos.push(req.body.grupo)
            repository
            .create(turma)
            .then(data => {
                resolve({
                    data: data
                });
            })
            .catch(err => {
                reject(err);
            });
        });
    });
}

exports.sairGrupo = function (req) {
    return new Promise(function (resolve, reject) {
        repository.findById(Turma, req.params.idTurma).then(turma => {
            for(var i in turma.grupos){
                if(turma.grupos[i].id == req.params.idGrupo){
                    turma.grupos[i].alunos = turma.grupos[i].alunos.filter(a => a != req.body.aluno);
                    break;
                }
            }
            repository
            .create(turma)
            .then(data => {
                resolve({
                    data: data
                });
            })
            .catch(err => {
                reject(err);
            });
        });
    });
}