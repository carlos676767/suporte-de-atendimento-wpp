const inputUserName = document.getElementById("username");
const passwordInput = document.getElementById("password");
const button = document.querySelector("button");

async function httpLogin() {
  const dados = { usuario: inputUserName.value, senha: passwordInput.value };
  try {
    const httpRequest = await fetch("http://localhost:8080/loginAdm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const dados2 = await httpRequest.json();
    const { login, token } = dados2;
    localStorage.setItem("tk", token);
    valide(login);
  } catch (error) {
    console.log("ocorreu um erro inesperado", error);
  }
}

function valide(login) {
  if (login) {
    location.href = "../ticket.html";
  }
}

addEventListener("DOMContentLoaded", () => {
  const jwt = localStorage.getItem("tk");
  fetch("http://localhost:8080/loginAdm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.login) {
        location.href = "../ticket.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

button.addEventListener("click", () => {
  httpLogin();
});
