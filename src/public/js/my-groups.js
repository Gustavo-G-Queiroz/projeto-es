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

async function get_my_groups() {
  const result = await fetch(`/aluno/${ra_owner}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => result.json());

  if (result.grupos) {
    for (let i = 0; i < result.grupos.length; i++) {
      const result2 = await fetch(
        `/grupo/${result.grupos[i].idTurma}/${result.grupos[i]._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((result) => result.json())
        .then(function (data) {
          let select_element = document.querySelector("#group-table tbody");
          const grupos = data.data;
          const turma = data.turma;

          for (let i = 0; i < grupos.length; i++) {
            let tr = document.createElement("tr");
            let tdTurma = document.createElement("td");
            let tdGrupo = document.createElement("td");

            tdTurma.setAttribute("value", result.grupos[i].idTurma);
            tdGrupo.setAttribute("value", grupos[i]._id);

            tr.classList.add("grupo-row");
            tdTurma.classList.add("turma");
            tdGrupo.classList.add("grupo-nome");

            tdTurma.innerHTML = `${turma}`;
            tdGrupo.innerHTML = `${grupos[i].nome}`;

            tr.appendChild(tdTurma);
            tr.appendChild(tdGrupo);
            select_element.appendChild(tr);
          }
        });
    }

    click_group();
  }
}

get_my_groups();

function click_group() {
  const grupo = document.getElementsByClassName("grupo-row");

  for (let i = 0; i < grupo.length; i++) {
    grupo[i].addEventListener("click", () => {
      let codigoTurma = grupo[i]
        .getElementsByClassName("turma")[0]
        .getAttribute("value");

      let codigoGrupo = grupo[i]
        .getElementsByClassName("grupo-nome")[0]
        .getAttribute("value");

      let base_url = window.location.origin;
      let new_url = base_url + `/grupo/list/${codigoTurma}/${codigoGrupo}`;

      location.href = new_url;
    });
  }
}

const menuContainer = document.getElementsByClassName("nav-menu")[0];
const navItem = menuContainer.getElementsByClassName("nav-item")[1];
navItem.className += " active";
