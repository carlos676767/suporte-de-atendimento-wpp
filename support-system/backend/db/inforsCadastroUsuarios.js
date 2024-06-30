const { MongoClient } = require('mongodb');
const mensagemEmailExistente = require('../bot/commands/msgTemEmail');
const mensagemConfirmacaoEmail = require('../bot/commands/confirmarEmail');
const mensagemCadastroSucesso = require('../bot/commands/msgCorfimEmail');
const url = "mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/"
const dbName = "suporteWpp"
const collection = "cadastroUsers"

const connectDatabase = async () => {
  try {
    const dbNewClient = new MongoClient(url);
    const dbConnect = await dbNewClient.connect();
    const dbNameConnect = await dbConnect.db(dbName);
    const acessCollectionDb = await dbNameConnect.collection(collection);
    return acessCollectionDb;
  } catch (error) {
    console.error("error connecting to db")
  }
};


const listDocumentsDb = async (email, msg) => {
  try {
    const db = await connectDatabase();
    const listDocuments = await db.find().toArray();
    listDocuments.forEach((data) => {
      if (data.email == email) {
       msg.reply(mensagemEmailExistente)
      }else{
        msg.reply(mensagemConfirmacaoEmail)
        if (true) {
          msg.reply(mensagemCadastroSucesso)
        }
      }
    });
  } catch (error) {
    console.error(error)
  }
};

module.exports = listDocumentsDb