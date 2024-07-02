
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/"
const dbName = "suporteWpp"
const collection = "tickets"


async function connectDb() {
  try {
    const connectCliente = new MongoClient(url)
    const db = await connectCliente.db(dbName)
    const collevctionDb = await db.collection(collection)
    return collevctionDb
  } catch (error) {
    console.error("error connecting to db")
  }
}


const cadastroTicketUser = async (title, acontecido, situacao, ticket) => {
  try {
    const db = await connectDb();
    const appendDados = await db.insertOne({
      titulo: title,
      acontecido: acontecido,
      situacao: situacao,
      ticket: ticket
    });
    return appendDados
  } catch (error) {
    console.error("error ao adicionar dados")
  }
};


 async function mostrarTicketsAbertos() {
  try {
    const db = await connectDb()
    const dados = await db.find().toArray()
    return dados
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
    cadastroTicketUser,
    mostrarTicketsAbertos
}
