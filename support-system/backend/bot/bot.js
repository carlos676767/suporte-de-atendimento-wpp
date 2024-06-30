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
 
const bot = () => {
  menu()
}

(async()=> {
    await client.initialize()
    bot()
})()
