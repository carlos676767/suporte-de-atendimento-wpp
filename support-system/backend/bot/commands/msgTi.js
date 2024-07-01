const crypetor = require("crypto")
const randomTicket = crypetor.randomBytes(6).toString("hex")
const ticketMsg = `
Olá! Seu ticket foi aberto com sucesso. O número do seu ticket é ${randomTicket}. 
or favor, fique de olho no seu email para nossa resposta. Estamos aqui para ajudar! 📧`
module.exports = {ticketMsg,randomTicket}