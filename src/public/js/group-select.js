const grupo = document.getElementsByClassName("entrar");

for (let i = 0; i < grupo.length; i++) {
  grupo[i].addEventListener("click", join_in_group);

  async function join_in_group(event) {
    event.preventDefault();

    let grupoElement = document.getElementsByClassName("grupo")[i];
    let grupoId = grupoElement.querySelector("input[type=hidden]").value;
    let disciplinaId = document.querySelector(
      "#groups-available-message input[type=hidden]"
    ).value;

    const ra_aluno = getCookie("ra");

    function getCookie(cName) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie);
      const cArr = cDecoded.split("; ");
      let res;
      cArr.forEach((val) => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      });
      return res;
    }

    const decodedDisciplina = disciplinaId.split(" ");
    const decodedGrupoId = grupoId.split(" ");

    const result = await fetch(
      `/turma/entrar/${decodedDisciplina[0]}/${decodedGrupoId[0]}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aluno: ra_aluno,
        }),
      }
    ).then((result) => result.json());

    if (result.status === "ok") {
      alert("Grupo atualizado!");

      // redirecionar para o grupo que acabou de entrar
    } else {
      alert(result.error);
    }
  }
}

const menuContainer = document.getElementsByClassName("nav-menu")[0];
const navItem = menuContainer.getElementsByClassName("nav-item")[0];
navItem.className += " active";
