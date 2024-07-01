const { MongoClient } = require('mongodb');

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

const listDocumentsDb = async (emai) => {
  try {
    const db = await connectDatabase();
    const query = {email: emai}
    const listDocuments = await db.findOne(query)
    console.log();
    return listDocuments
   
  } catch (error) {
    console.error(error)
  }
};


module.exports = listDocumentsDb

