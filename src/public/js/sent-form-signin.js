const form = document.getElementById("form-signin");

form.addEventListener("submit", login_user);

async function login_user(event) {
  event.preventDefault();
  const user = document.getElementById("user").value;
  const password = document.getElementById("password").value;

  const result = await fetch("/aluno/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ra: user,
      senha: password,
    }),
  }).then((result) => result.json());

  if (result.status === "ok") {
    alert("Usuário logado");

    let base_url = window.location.origin;
    let new_url = base_url + `/turma/list`;
    location.href = new_url;
  } else {
    alert(result.error);
  }
}
