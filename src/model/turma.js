const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GrupoSchema = new Schema({
    nome: {type: String, required: true},
    integrantes: {type: Number, required: true},
    privado: {type: Boolean, required: true, default: false},
    lider: {type: String, required: true},
    alunos: [{type: String, required: true}],
});

let TurmaSchema = new Schema({
    _id: {type: String, required: true},
    disciplina: {type: String, required: true},
    grupos: [{type: GrupoSchema, required: false}],
}, { collection: 'turma' });

module.exports = mongoose.model('Turma', TurmaSchema);