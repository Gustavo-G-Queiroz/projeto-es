var mongoose = require("mongoose");
var Aluno = mongoose.model("Aluno")
const repository = require("../repository/repository");


exports.createAluno = function (req) {
    return new Promise(function (resolve, reject) {
        //hash senha
        let aluno = new Aluno(
            {
                _id: req.body.id,
                nome: req.body.nome,
                senha: req.body.senha,
                email: req.body.email,
                perms: {
                    admin: req.body.perms.admin,
                    banned: false
                }
            }
        );
        repository
            .create(aluno)
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

exports.listAluno = function () {
    return repository.list(Aluno);
}


exports.findAluno = function (id) {
    return repository.findById(Aluno, id);
}