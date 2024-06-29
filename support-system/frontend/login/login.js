

const inputUserName = document.getElementById("username");
const passwordInput = document.getElementById("password");
const button = document.querySelector("button");

async function httpLogin() {
const dados = {  usuario: inputUserName.value,  senha: passwordInput.value   }
  try {
    const httpRequest = await fetch("http://localhost:8080/loginAdm", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    const dados2 = await httpRequest.json()
    const {login} = dados2
    valide(login)
    // console.log(dados2);
  } catch (error) {
    console.log("ocorreu um erro inesperado", error);
  }
}

function valide(login) {
  if (login == true) {
    alert("em 5 segundos voce ira para a pagina.");
    location.href = "../ticket2.html";
  }
}

button.addEventListener("click", () => {
    httpLogin()
});
