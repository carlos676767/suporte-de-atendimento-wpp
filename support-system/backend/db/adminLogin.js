const { MongoClient } = require('mongodb');
const path = require("path")
const caminhonv = path.resolve(".env")
console.log(caminhonv);
require('dotenv').config({ path:caminhonv })
const url = `mongodb+srv://admin:admin1234@dados.7d94myt.mongodb.net/`
const dbName = "suporteWpp"
const collection = "login"

async function dbAuthAdmin() {
  try {
    const dbConnect = new MongoClient(url);
    await dbConnect;
    const dbNameConect = await dbConnect.db(dbName);
    const connectColection = await dbNameConect.collection(collection).find().toArray();
    const {usuario, senha} = connectColection[0]
   return {usuario,senha}
  } catch (error) {
    console.error("ocorreu um error");
  }
}

module.exports = dbAuthAdmin
