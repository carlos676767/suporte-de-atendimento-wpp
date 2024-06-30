const listDocumentsDb = require("../db/inforsCadastroUsuarios");
const mensagem = require("./commands/commandInfo");
const menuCommand = require("./commands/msgMenu");
const { Client, LocalAuth, Buttons } = require("whatsapp-web.js")

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
    if (msg.body.includes("1")) {
      msg.reply(mensagem);
      client.once("message", async(ms) => {
        const dadosMensagem = ms.body.split(" ")
        console.log(dadosMensagem[1]);
        await listDocumentsDb(dadosMensagem[1], ms)
      
      })
    }
  });
};

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
