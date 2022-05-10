const form = document.getElementById("form-signup");
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();
  const id = document.getElementById("ra").value;
  const email = document.getElementById("email").value;
  const nome = document.getElementById("name").value;
  const senha = document.getElementById("password").value;

  const result = await fetch("/aluno/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      email,
      nome,
      senha,
      perms: {
        admin: false,
        banned: false,
      },
    }),
  }).then((result) => result.json());

  if (result.status === "ok") {
    alert("Usuário criado com sucesso!");

    let base_url = window.location.origin;
    let new_url = base_url + `/turma/list`;
    location.href = new_url;
  } else {
    alert(result.error);
  }
}
