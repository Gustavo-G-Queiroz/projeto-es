# UFABC Group Finder
Projeto Engenharia de Software 2022

Aplicação web que visa facilitar a formação de grupos de trabalho nas disciplinas.

# Instruções para execução

## Requisitos
O projeto é executado em node, portanto, [o mesmo deve ser instalado](https://nodejs.org/en/download/)

Além disso, é necessária a instalação de dependecias, recomenta-se utilizar [o NPM](https://docs.npmjs.com/cli/v6/commands/npm-install)

**Dependencias**
```json
"dependencies": {
    "bcrypt": "^5.0.1",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.0",
    "cookie-parser": "^1.4.6",
    "ejs": "^3.1.7",
    "express": "^4.17.3",
    "express-sesssion": "^1.15.5",
    "helmet": "^5.0.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.2.10"
  }
```

## Banco de dados

Para conexão com o banco de dados é necessária a criação de um arquivo .env na pasta /src, contendo a variável DATABASE_URL com a url para a conexão de uma base Mongo.

Pode-se utilizar a seguinte:

`DATABASE_URL = mongodb+srv://user_g_ufabc:vdokizaq564d@escluster.pm73m.mongodb.net/main_db?retryWrites=true&w=majority`

## Execução

Basta inserir o comando node app.js no caminho /src para executar a aplicação.


# Backend e arquitetura

  A aplicação foi desenvolvida em node js, utilizando a arquitetura MVC. Os dados são salvos em um banco NoSQL.
  
## Entidades

São utilizadas duas entidades principais (models).



### Aluno
Entidade que contém os dados do aluno, os meios de comunicação, as permissões e os grupos dos quais o mesmo participa.
```js
CommsSchema = ({
    discord: {type: String, required: false},
    phone: {type: String, required: false},
    skype: {type: String, required: false},
});

PermsSchema = Schema({
    admin: {type: Boolean, required: true, default: false},
    banned: {type: Boolean, required: true, default: false},
});

GrupoSchema = Schema({
    idTurma: {type: String, required: true},
    _id: {type: String, required: true},
})

AlunoSchema = Schema({
    _id: {type: String, required: true, max: 11},
    nome: {type: String, required: true},
    senha: {type: String, required: true},
    email: {type: String, required: true},
    comms: {type: CommsSchema, required: false},
    perms: {type: PermsSchema, required: true},
    grupos: [{type: GrupoSchema, required: false}],
}
```



### Turma
A entidade turma contém os dados da disciplina e os grupos nela criados.
```js
GrupoSchema = Schema({
    nome: {type: String, required: true},
    integrantes: {type: Number, required: true},
    privado: {type: Boolean, required: true, default: false},
    lider: {type: String, required: true},
    alunos: [{type: String, required: true}],
});

TurmaSchema = Schema({
    _id: {type: String, required: true},
    disciplina: {type: String, required: true},
    grupos: [{type: GrupoSchema, required: false}],
}
```



## Rotas

A API possui as seguintes rotas:

### Cadastrar aluno
**URL**: `/aluno/create`

**Método**: POST

**Body**
```json
{
    "id": "11201976985",
    "nome": "joao",
    "senha": "feijoada",
    "email": "joao@email.com",
    "perms": {
        "admin": false
    }
}
```

**Resposta**
```json
{
    "data": {
        "_id": "11201976985",
        "nome": "joao",
        "senha": "$2a$10$WWqaCCMLg8gVZ3lIz73uneQyNwW1mPU5PLrERc0xukeuZLMekO8bS",
        "email": "joao@email.com",
        "perms": {
            "admin": false,
            "banned": false,
            "_id": "6279aaef23c750006543e6e2"
        },
        "grupos": [],
        "__v": 0
    }
}
```


### Listar alunos
**URL**: `/aluno/list`

**Método**: GET
```json
[
    {
        "_id": "11201921170",
        "nome": "Aluno 1",
        "senha": "$2a$10$/k.bttzMCavZKwGdcDban.D9Rk1JWIs6Qo52c6T1AiE7mn.4Rd4n6",
        "email": "aluno1@gmail.com",
        "perms": {
            "admin": false,
            "banned": false,
            "_id": "62796d141b75cc76a07675c1"
        },
        "grupos": [],
        "__v": 6
    },
    {
        "_id": "11201921171",
        "nome": "Aluno 2",
        "senha": "$2a$10$QPSYpXLjbim.H323SBdS/e90oH5uk5Q99VaHR8Kz2HcGwCu9TVgza",
        "email": "aluno2@gmail.com",
        "perms": {
            "admin": false,
            "banned": false,
            "_id": "62796d861b75cc76a07675d9"
        },
        "grupos": [],
        "__v": 16
    }
```


### Login
**URL**: `/aluno/login`

**Método**: POST

**Body**
```json
{
    "ra": "11201976985",
    "senha": "feijoada"
}
```

**Resposta**
```json
{
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMjAxOTc2OTg1IiwidXNlcm5hbWUiOiJqb2FvIiwiaWF0IjoxNjUyMTQxMjY3fQ.pXWWwqTg8fHOqCOJ84jxuItpRboL3u0MgTAIzIDlmVY"
}
```


### Cadastrar Turma
**URL**: ´/turma/create´

**Método**: POST

**Body**
```json
{
    "id": "1",
    "disciplina": "Redes de Computadores",
    "grupos": [
    ]
}
```


### Lista Turma
**URL**: `/turma/list`

**Método**: GET

**Resposta**
```json
[
    {
        "_id": "1",
        "disciplina": "Redes de Computadores",
        "grupos": [],
        "__v": 0
    }
]
```

### Encontrar Turma
**URL**: `/turma/:idTurma`

**Método**: GET

**Resposta**
```json
{
    "_id": "1",
    "disciplina": "Redes de Computadores",
    "grupos": [],
    "__v": 0
}
```

### Encontrar Aluno
**URL**: `/aluno/:raAluno`

**Método**: Get

**Resposta**
```json
{
    "_id": "11201976985",
    "nome": "joao",
    "senha": "$2a$10$tzZkKSNYhBCehlxiicQOSupLxxDIHU9A9CY/XZdDnHVrgRb9nex3G",
    "email": "joao@email.com",
    "perms": {
        "admin": false,
        "banned": false,
        "_id": "6279b34823c750006543e6f4"
    },
    "grupos": [],
    "__v": 0
}
```

### Entrar em grupo
**URL**: `/turma/entrar/:idTurma/:idGrupo

**Método**: PUT

**Body**
```json
{
    "aluno": "11201976985"
}
```

### Sair em grupo
**URL**: `/turma/sair/:idTurma/:idGrupo`

**Método**: DELETE

**Body**
```json
{
    "aluno": "11201976985"
}
```

### Criar Grupo
**URL**: `/turma/grupo/:idTurma`

**Método**: PUT

**Body**
```json
{
    "grupo": {
        "nome": "Grupo Y",
        "integrantes": 3,
        "privado": false,
        "lider": "Marcus",
        "alunos": ["11201988473"]
    }
}
```

**Resposta**
```json
{
    "data": {
        "_id": "1",
        "disciplina": "Redes de Computadores",
        "grupos": [
            {
                "nome": "Grupo Y",
                "integrantes": 3,
                "privado": false,
                "lider": "Marcus",
                "alunos": [
                    "11201988473"
                ],
                "_id": "6279b41523c750006543e6fb"
            }
        ],
        "__v": 1
    }
}
```
