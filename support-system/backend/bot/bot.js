const listDocumentsDb = require("../db/inforsCadastroUsuarios");
const mensagem = require("./commands/commandInfo");
const menuCommand = require("./commands/msgMenu");
const { Client, LocalAuth, Buttons } = require("whatsapp-web.js");
const mensagemEmailExistente = require("./commands/msgTemEmail");
const mensagemConfirmacaoEmail = require("./commands/confirmarEmail");
const randomCod = require("../email/confirmarCadastroEmail");
const sendEmail = require("../email/confirmarCadastroEmail");
const mensagemCadastroSucesso = require("./commands/msgCorfimEmail");
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('cliente conectado');
});


const menu = () => {
  client.on("message",msg => {
    if (msg.body.includes("oi")) {
      msg.reply(menuCommand);
    }
  });
};
 
const optionRegister = () => {
  client.on("message", (msg) => {
    if (msg.body == '1') {
      msg.reply(mensagem);
      client.once("message", async (ms) => {
        const dadosMensagem = ms.body.split(" ");
        const serach = await listDocumentsDb(dadosMensagem[1], ms);
        if (serach) {
          ms.reply(mensagemEmailExistente)
        } else {
         await autenticarEmail(ms, dadosMensagem)
        }
      });
    }
  });
};

 async function autenticarEmail(ms, dadosMensagem) {
   ms.reply(mensagemConfirmacaoEmail);
   const enviarEmail = await sendEmail(dadosMensagem[1]);
   client.once("message", (mss) => {
     if (mss.body == enviarEmail) {
       mss.reply(mensagemCadastroSucesso);
       const tellFormatadoSemLetras = ms.from.replace("@c.us", "")
       console.log(tellFormatado, dadosMensagem[0], dadosMensagem[1]);
     }
   });
 }

const bot = () => {
  menu()
  optionRegister()
}

(async () => {
  try {
    await client.initialize();
    bot();
  } catch (error) {
    console.error(error);
  }
})();
