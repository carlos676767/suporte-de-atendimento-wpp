
const mensagem = require("./commands/commandInfo");
const menuCommand = require("./commands/msgMenu");
const { Client, LocalAuth, Buttons } = require("whatsapp-web.js");
const mensagemEmailExistente = require("./commands/msgTemEmail");
const mensagemConfirmacaoEmail = require("./commands/confirmarEmail");
const randomCod = require("../email/confirmarCadastroEmail");
const sendEmail = require("../email/confirmarCadastroEmail");
const mensagemCadastroSucesso = require("./commands/msgCorfimEmail");
const { listDocumentsDb, newDadosUsers, listarUserNumber } = require("../db/inforsCadastroUsuarios");
const promptMessage = require("./commands/msgTicket");
const { cadastroTicketUser } = require("../db/tickets");
const pro = require("./commands/titleProblema");
const enfretado = require("./commands/problemamaenfretado");
const msgUrgencia = require("./commands/urgencia");
const { ticketMsg, randomTicket } = require("./commands/msgTi");
const valideEmail = require("./commands/msgValidEmail");

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
        console.log(dadosMensagem[1]);
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
   client.once("message", async (mss) => {
     if (mss.body == enviarEmail) {
       mss.reply(mensagemCadastroSucesso);
       const tellFormatadoSemLetras = mss.from.replace("@c.us", "");
       await newDadosUsers(
         dadosMensagem[0],
         dadosMensagem[1],
         tellFormatadoSemLetras
       );
     }
   });
}

const cadastrarTicket = () => {
  client.on("message", async (msg) => {
    if (msg.body == "2") {
      const number = msg.from.replace("@c.us", "");
      console.log(number);
      const buscarNumber = await listarUserNumber(number);
      if (buscarNumber) {
        await msg.reply(promptMessage);
        await msg.reply(pro);
        const title =  await trazerMsgEretornar(enfretado)
        const acontecido = await trazerMsgEretornar(msgUrgencia)
        const urgencia = await trazerMsgEretornar(ticketMsg)
        await cadastroTicketUser(title, acontecido, urgencia, randomTicket);
      } else {
        msg.reply(valideEmail);
      }
    }
  });
};


function ouviente(event) {
  return new Promise((resolve) => {
    client.once(event, resolve);
  });
}


async function trazerMsgEretornar(msg) {
  const mensagem = await ouviente("message");
  mensagem.reply(msg);
  return mensagem.body;
}

const bot = () => {
  menu();
  optionRegister();
  cadastrarTicket();
}


(async () => {
  try {
    await client.initialize();
    bot();
  } catch (error) {
    console.error(error);
  }
})();
