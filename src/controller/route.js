const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

const aluno_controller = require("./alunoController");
const turma_controller = require("./turmaController");

router.get("/aluno/list", aluno_controller.list);
router.get("/aluno/:id", aluno_controller.find);

router.post("/turma/create", turma_controller.create);

router.get("/turma/list", turma_controller.list);

router.get("/novo-grupo", (req, res) => {
  let user = req.cookies.name;
  res.render("novo-grupo", {
    name: user,
  });
});

router.get("/minha-conta", (req, res) => {
  let user = req.cookies.name;
  let email = req.cookies.email;
  let ra = req.cookies.ra;

  res.render("account", {
    name: user,
    email: email,
    ra: ra,
  });
});

router.get("/meus-grupos", (req, res) => {
  let user = req.cookies.name;

  res.render("my-groups", {
    name: user,
  });
});

router.post("/sair", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("ra");
  res.clearCookie("name");
  res.clearCookie("email");
  res.clearCookie("grupos");
  res.send({ status: "ok" });
});

router.get("/turma/:id", turma_controller.find);
router.put("/turma/grupo/:id", turma_controller.createGrupo);
router.put("/turma/entrar/:idTurma/:idGrupo", turma_controller.entrarGrupo);
router.delete("/turma/sair/:idTurma/:idGrupo", turma_controller.sairGrupo);

router.get("/grupo/:turma/:id", turma_controller.findGrupo);
router.get("/grupo/list/:turma/:id", turma_controller.listGrupo);

router.get("/turma/api/list", turma_controller.list_api);
router.get("/turma/api/:id", turma_controller.find_api);

module.exports = (app) => app.use(router);
