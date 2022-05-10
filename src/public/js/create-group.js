async function get_classes(event) {
  const result = await fetch("/turma/api/list")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let select_element = document.getElementById("turma-select");
      const turmas = data;

      for (let i = 0; i < turmas.length; i++) {
        let option = document.createElement("option");
        option.value = turmas[i]._id;
        option.innerHTML = `${turmas[i].disciplina} - ${turmas[i]._id}`;
        select_element.appendChild(option);
      }
    });
}

get_classes();

const form_new_group = document.getElementById("form-newgroup");
form_new_group.addEventListener("submit", register_group);

async function register_group(event) {
  event.preventDefault();

  const select = document.getElementById("turma-select");
  const group_id = select.options[select.selectedIndex].value;
  const group_name = document.getElementById("name").value;
  const nr_guests = document.getElementById("integrantes").value;

  const owner = getCookie("name");
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

  const result = await fetch(`/turma/grupo/${group_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grupo: {
        nome: group_name,
        integrantes: nr_guests,
        privado: false,
        lider: owner,
        alunos: ra_owner,
      },
    }),
  }).then((result) => result.json());

  if (result.status === "ok") {
    alert("Grupo criado com sucesso!");
  } else {
    alert(result.error);
  }
}

const menuContainer = document.getElementsByClassName("nav-menu")[0];
const navItem = menuContainer.getElementsByClassName("nav-item")[2];
navItem.className += " active";
