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