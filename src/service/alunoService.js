var mongoose = require("mongoose");
var Aluno = mongoose.model("Aluno")
const jwt = require('jsonwebtoken')
const express = require('express')
const repository = require("../repository/repository");
const passCrypt = require("./passCrypt")
const segredoprojwt = '019834h01nbfh0gvnu418u3r914h*@#*@(!#(#&$()*#!&(#!e0f8ub1349fun3094ghn1084uijn1934hr9014nt0913u4gbh'


exports.createAluno = function (req) {
    return new Promise(function (resolve, reject) {
        passCrypt.passBcrypt(req.body.senha).then(password => {
            let aluno = new Aluno(
                {
                    _id: req.body.id,
                    nome: req.body.nome,
                    senha: password,
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
                    if (err.code == 11000) {
                        resolve({
                            status: 'error', error: 'Usuário já existente.'
                        })
                    }
                    resolve({
                        status: 'error', error: 'Ocorreu uma falha no cadastro.'
                    })

                });
        });
    });
}

exports.listAluno = function () {
    return repository.list(Aluno);
}

exports.findAluno = function (id) {
    return repository.findById(Aluno, id);
}

exports.alunoLogin = function (req) {
    return new Promise(function (resolve, reject) {
        repository.findById(Aluno, req.body.ra).then(aluno => {
            passCrypt.comparePass(req.body.senha, aluno.senha).then(comp => {
                if (comp) {
                    const token = jwt.sign({
                        id: aluno._id,
                        username: aluno.nome
                    }, segredoprojwt)

                    resolve({ status: 'ok', data: token });
                }
                resolve({ status: 'error', error: 'Usuário/senha inválido(s), tente novamente.' });
            });
        }).catch(err => {
            resolve({ status: 'error', error: 'Usuário/senha inválido(s), tente novamente.' });
        });
    });
}


exports.updateAluno = function (idTurma, idGrupo, ra) {
    return new Promise(function (resolve, reject) {
        repository.findById(Aluno, ra).then(aluno => {
            var grupo = {
                'idTurma': idTurma,
                '_id': idGrupo
            };
            for(var i in aluno.grupos){
                if(aluno.grupos[i]._id == idGrupo){
                    aluno.grupos = aluno.grupos.filter(g => g._id != grupo._id);
                    break;
                }else{
                    aluno.grupos.push(grupo)
                    break;
                }
            }
            
            
            repository
                .create(aluno)
                .then(data => {
                    resolve({
                        data: data
                    });
                })
                .catch(err => {
                    resolve({
                        status: 'error', error: 'Ocorreu uma falha no cadastro.'
                    })
                });
        });
    })
}