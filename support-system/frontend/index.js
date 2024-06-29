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
        location.href = "./login/login.html";
        alertaDeslogado()
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const alertaDeslogado = () => {
  Swal.fire({
    icon: "warning",
    title: "Sessão Expirada",
    text: "Sua sessão expirou. Por favor, faça login novamente.",
    confirmButtonText: "OK",
  });
};
