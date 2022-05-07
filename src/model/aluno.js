const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CommsSchema = new Schema({
    discord: {type: String, required: false},
    phone: {type: String, required: false},
    skype: {type: String, required: false},
});

let PermsSchema = new Schema({
    admin: {type: Boolean, required: true, default: false},
    banned: {type: Boolean, required: true, default: false},
});

let GrupoSchema = new Schema({
    idTurma: {type: String, required: true},
    _id: {type: String, required: true},
})

let AlunoSchema = new Schema({
    _id: {type: String, required: true, max: 11},
    nome: {type: String, required: true},
    senha: {type: String, required: true},
    email: {type: String, required: true},
    comms: {type: CommsSchema, required: false},
    perms: {type: PermsSchema, required: true},
    grupos: [{type: GrupoSchema, required: false}],
}, { collection: 'aluno' });

module.exports = mongoose.model('Aluno', AlunoSchema);