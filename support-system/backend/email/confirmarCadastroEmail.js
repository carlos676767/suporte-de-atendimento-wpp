const cryptor = require("crypto")
const nodeMailer = require("nodemailer")
const configuracao = require("../../../config.json")

function randomCod() {
    return cryptor.randomBytes(6).toString("hex")
}

const configurarEmail = () => {
  const config = nodeMailer.createTransport({
    service: "yahoo",
    auth: {
      user: configuracao.email,
      pass: configuracao.senha,
    },
  });
  return config
};

const sendEmail = async(emailPerson) => {
    const cod = randomCod()
    const info = await configurarEmail().sendMail({
        from: configuracao.email,
        to: emailPerson,
        subject: "Confirmação de Email: Por favor, confirme seu endereço de email conosco",
        text: cod
    })
    return cod
}


module.exports = sendEmail
