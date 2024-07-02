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
    const createDiv = document.createElement("div");
    const section = document.querySelector("section");
    createDiv.classList.add("ticket");
    response.dbDados.forEach((dados) => {
      const { titulo, acontecido, situacao, ticket } = dados;
      createDiv.innerHTML += ` <h3>${titulo}</h3>
      <p><strong><i class="fa-solid fa-user"></i> User:</strong> John Doe</p>
      <p><strong><i class="fa-solid fa-circle-xmark"></i> problem:</strong> ${acontecido}</p>
      <p><strong><i class="fa-solid fa-user-gear"></i> situation:</strong>${situacao}</p>
      <p><strong><i class="fa-solid fa-ticket"></i> Ticket: </strong>${ticket}</p>
      <textarea placeholder="Write your response here..."></textarea>
      <button>Send Response</button>`;
      section.appendChild(createDiv);
    });
  } catch (error) {
    console.error("ocorreu um error", error);
  }
})();
