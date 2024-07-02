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

(async () => {
  try {
    const data = await fetch("http://localhost:8080/tickets");
    const response = await data.json();
    const tbody = document.querySelector("tbody");
    let contador = 0
    tbody.innerHTML = ""
    response.dbDados.forEach((dados) => {
      const { titulo, acontecido, situacao, ticket } = dados;
      tbody.innerHTML += `<tr>
      <td>1</td>
      <td>${titulo}</td>
      <td><i class="fas fa-circle-notch text-primary"></i> Open</td>
      <td>${situacao}</td>
      <td>${ticket}</td>
      <td>${acontecido}</td>
      <td>
          <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#responseModal">
              <i class="fas fa-reply"></i> Respond
          </button>
      </td>
  </tr>`;
  ++contador
  totalTickets(contador)
    });
  } catch (error) {
    console.error("ocorreu um error", error);
  }
})();


const totalTickets = (count) => {
  const totalTickets = document.getElementById("totalTickets")
  totalTickets.innerHTML = count
}


