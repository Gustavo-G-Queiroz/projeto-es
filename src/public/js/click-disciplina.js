const disciplina = document.getElementsByClassName("disciplina");

for (let i = 0; i < disciplina.length; i++) {
  disciplina[i].addEventListener("click", () => {
    let codigo =
      disciplina[i].getElementsByClassName("disciplina-codigo")[0].textContent;
    codigo = codigo.replace(/\s/g, "");

    let base_url = window.location.origin;
    let new_url = base_url + `/turma/${codigo}`;

    location.href = new_url;
  });
}

const menuContainer = document.getElementsByClassName("nav-menu")[0];
const navItem = menuContainer.getElementsByClassName("nav-item")[0];
navItem.className += " active";
