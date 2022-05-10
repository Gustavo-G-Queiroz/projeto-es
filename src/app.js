require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();
app.use(helmet());
app.use(cookieParser());

const conector = require("./repository/conector");
require("./model/aluno");
require("./model/turma");

const database = conector.conectar();

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Base de dados conectada");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));

require("./controller/authController")(app);
require("./controller/route")(app);

let port = 8080;

app.listen(port, () => {
  console.log("Servidor ativo!");
});
