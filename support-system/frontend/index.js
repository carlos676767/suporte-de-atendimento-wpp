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
      console.log(data.login);
      if (!data.login) {
        alertaDeslogado();
        redirecionar();
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const redirecionar = () => {
  setInterval(() => {
    location.href = "./login/login.html";
  }, 5000);
};

const alertaDeslogado = () => {
  Swal.fire({
    icon: "warning",
    title: "Sessão Expirada",
    text: "Sua sessão expirou. Por favor, faça login novamente. Você será redirecionado para a tela de login em 5 segundos.",
    confirmButtonText: "OK",
  });
};
