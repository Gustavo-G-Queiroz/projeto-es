const menuContainer = document.getElementsByClassName("nav-menu")[0];
const navItem = menuContainer.getElementsByClassName("nav-item")[1];
navItem.className += " active";

const ra_owner = getCookie("ra");

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

const sairGrupo = document.getElementById("sair-do-grupo");

let codigo_turma = document.getElementById("id-turma").value;
let codigo_grupo = document.getElementById("id-grupo").value;

codigo_turma = codigo_turma.split(" ");
codigo_grupo = codigo_grupo.split(" ");

sairGrupo.addEventListener("click", sairDoGrupo);

async function sairDoGrupo(event) {
  event.preventDefault();

  const result = await fetch(
    `/turma/sair/${codigo_turma[0]}/${codigo_grupo[0]}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        aluno: ra_owner,
      }),
    }
  ).then((result) => result.json());

  if (result.status === "ok") {
    let base_url = window.location.origin;
    let new_url = base_url + `/meus-grupos`;
    location.href = new_url;
  } else {
    alert(result.error);
  }
}
