const cryptor = require("crypto")
const nodeMailer = require("nodemailer")
require('dotenv').config({ path: '/.env' })
console.log(process.env.SENHA) 

function randomCod() {
    return cryptor.randomBytes(6).toString("hex")
}

const configurarEmail = () => {
    const config = nodeMailer.createTransport({
        service: "yahoo",
        auth: {
            credentials: process.env.EMAIL,
            pass: process.env.SENHA
        }
    })
}