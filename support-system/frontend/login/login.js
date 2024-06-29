

const inputUserName = document.getElementById("username");
const passwordInput = document.getElementById("password");
const button = document.querySelector("button");
async function httpLogin() {
const dados = {  usuario: inputUserName.ariaValueMax,  senha: passwordInput.value   }
  try {
    const httpRequest = await fetch("http://localhost:8080/loginAdm", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({dados})
    })
    const dados2 = await httpRequest.json()
    console.log(dados2);
  } catch (error) {
    console.log("ocorreu um erro inesperado", error);
  }
}


button.addEventListener("click", () => {
    httpLogin()
});
