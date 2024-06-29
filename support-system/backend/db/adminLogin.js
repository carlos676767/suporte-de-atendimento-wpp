const { MongoClient } = require('mongodb');
const path = require("path")
const caminhonv = path.resolve(".env")
console.log(caminhonv);
require('dotenv').config({ path:caminhonv })
const url = `mongodb+srv://admin:${process.env}@dados.7d94myt.mongodb.net/`
const dbName = "suporteWpp"
const collection = "login"

async function dbAuthAdmin() {
    const dbConnect = new MongoClient(url)
    await dbConnect
    const dbNameConect = await dbConnect.db(dbName)
    const connectColection = await dbNameConect.collection(collection).find().toArray()
    console.log(connectColection);
}

module.exports = dbAuthAdmin
