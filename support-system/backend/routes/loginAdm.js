const jsonWebToken = require("jsonwebtoken");
const cryopteor = require("crypto");
const dbAuthAdmin = require("../db/adminLogin");
const SECRET_KEY = cryopteor.randomBytes(32).toString("hex");
require('dotenv').config({ path: '/app.env' })
const bodyParser = require('body-parser');


module.exports = (api) => {
  api.use(bodyParser.json())
  api.use(async(req,res,next) => {
    const db = await dbAuthAdmin()
    const {usuario, senha} =  req.body
      verificarInput(usuario, senha,req)
      if (usuario == db.usuario && senha == db.senha) {
        const jwt = jsonWebToken.sign({usuario, senha}, SECRET_KEY, {expiresIn: "1h"})
        res.send({status: 200, msg: "login feito com sucesso.", login: true, token: jwt})

        next()
      }else{
        res.status(404).send({status: 404, login: false, msg: "Dados incorretos, verifique as credenciais."})
      }
  })

  api.post("/loginAdm", async(res,req) => {
    try {
      console.log('bem vindo');
     await req.sendFile(__dirname, "F:\suporte de atendimento wpp\support-system\backend\index.html ")
    } catch (error) {
    await  req.send({status: 404, login: false, msg: "ocorreu um erro tente novamente."}).status(404)  
    }
  });
};

 async function verificarInput(usuario, senha, req) {
  if (!usuario && !senha) {
    req.send({ msg: "Os dados estao vazios", login: false, status: 401 }).status(401);
  }
}
